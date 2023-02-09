import csv
import os
from datetime import datetime
import requests
from dateutil import parser

from django.shortcuts import render, redirect
from base.models import Room, Building
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout

from .forms import RoomForm, BuildingForm, CSVForm, MeetingForm
from .api.utils_meeting import handle_meeting_creation

# Create your views here.

@login_required(login_url='admin/login/?next=')
def data(request):

    def clean_str(str, default):
        if str.strip(" ") == "":
            return default
        else:
            return str

    def handle_uploaded_csv(f):
        data = None
        with open("base/tmp/upload/" + f.name, "wb+") as destination:
            for chunk in f.chunks():
                destination.write(chunk)

        with open("base/tmp/upload/" + f.name, "r", encoding="utf-8-sig") as destination:
            reader = csv.reader(destination, delimiter=';',
                                quotechar='"')

            # Code très propre pour que si l'on échange deux colonnes pas de problèmes
            dic_corres_index_rows = {
                "name": -1,
                "usage": -1,
                "ip_terminal": -1,
                "serial_number": -1,
                "terminal_type": -1,
                "number": -1,
                "postal_code": -1,
                "city": -1,
                "building_id": -1,
                "floor": -1,
                "ministere": -1,
                "direction": -1,
                "service": -1,
                "capacity": -1,
                "has_windows": -1,
            }
            list_title_columns = [
                "Name",
                "Usage (mutualisé / privatif)",
                "Addresse IP",
                "Numero de Serie",
                "Type terminal",
                "Number",
                "Code Postal",
                "Ville",
                "Batiment",
                "Etage",
                "ministere",
                "Direction",
                "Services",
                "capacité"
            ]
            for row in reader:
                if row[0] in list_title_columns:
                    for i in range(len(row)):
                        if row[i] == "Name":
                            dic_corres_index_rows["name"] = i
                        elif row[i] == "Usage (mutualisé / privatif)":
                            dic_corres_index_rows["usage"] = i
                        elif row[i] == "Addresse IP":
                            dic_corres_index_rows["ip_terminal"] = i
                        elif row[i] == "Numero de Serie":
                            dic_corres_index_rows["serial_number"] = i
                        elif row[i] == "Type terminal":
                            dic_corres_index_rows["terminal_type"] = i
                        elif row[i] == "Number":
                            dic_corres_index_rows["number"] = i
                        elif row[i] == "Code Postal":
                            dic_corres_index_rows["postal_code"] = i
                        elif row[i] == "Ville":
                            dic_corres_index_rows["city"] = i
                        elif row[i] == "Batiment":
                            dic_corres_index_rows["building_id"] = i
                        elif row[i] == "Etage":
                            dic_corres_index_rows["floor"] = i
                        elif row[i] == "ministere":
                            dic_corres_index_rows["ministere"] = i
                        elif row[i] == "Direction":
                            dic_corres_index_rows["direction"] = i
                        elif row[i] == "Services":
                            dic_corres_index_rows["service"] = i
                        elif row[i] == "capacité":
                            dic_corres_index_rows["capacity"] = i
                    continue

                unique_buildings_name = Building.objects.values_list(
                    "name", flat=True).distinct()
                if not ((row[dic_corres_index_rows["building_id"]] in unique_buildings_name) or
                        (row[dic_corres_index_rows["building_id"]].strip(" ") == "")):
                    tmpBuilding = Building(
                        name=row[dic_corres_index_rows["building_id"]],
                        city=row[dic_corres_index_rows["city"]],
                        postal_code=row[dic_corres_index_rows["postal_code"]],
                    )

                    tmpBuilding.save()

                tmpRecord, _ = Room.objects.update_or_create(
                    name=clean_str(
                        row[dic_corres_index_rows["name"]], "No_Name_Assigned"),
                    ip_terminal=clean_str(
                        row[dic_corres_index_rows["ip_terminal"]], "Not precised"),
                    number=clean_str(row[dic_corres_index_rows["number"]], 0),
                    floor=clean_str(row[dic_corres_index_rows["floor"]], 1),
                    direction=clean_str(
                        row[dic_corres_index_rows["direction"]], "No direction"),
                    capacity=clean_str(
                        row[dic_corres_index_rows["capacity"]], 0),
                    terminal_type = clean_str(
                        row[dic_corres_index_rows["terminal_type"]].lower(), "cisco"
                    ),
                )

                if row[dic_corres_index_rows["building_id"]].strip(" ") != "":
                    tmpRecord.building_id = Building.objects.get(
                        name=row[dic_corres_index_rows["building_id"]])

                tmpRecord.save()

        os.remove("base/tmp/upload/" + f.name)
        return True

    success_upload = None
    if request.method == "POST" and "database-load" in request.POST:
        form_csv = CSVForm(request.POST, request.FILES)
        if form_csv.is_valid():
            success_upload = handle_uploaded_csv(request.FILES["file"])
            return redirect("data")
    
    elif request.method == "POST" and "create-meeting" in request.POST:
        form_meeting = MeetingForm(request.POST)
        if form_meeting.is_valid():
            data = form_meeting.cleaned_data
            handle_meeting_creation(data)

            return redirect("data")
    
    form_csv= CSVForm()
    form_meeting = MeetingForm()

    rooms = Room.objects.all()
    buildings = Building.objects.all()
    context = {"rooms": rooms, "buildings": buildings, "form_csv": form_csv, "form_meeting" : form_meeting}
    return render(request, 'data.html', context)

@login_required(login_url='admin/login/?next=')
def room_infos(request, pk):
    room = Room.objects.get(id=pk)

    next_meetings = []

    if room.is_init:
        meetings = requests.get(f"http://localhost:8000/api/get-meetings-room/{room.ip_terminal}")
        if meetings.ok:
            meetings = meetings.json()
        else :
            raise Exception("An error has occured while calling the api to get the room's meetings : " + meetings.text)
        for meet in meetings["results"]:
            start_date, end_date = parser.parse(meet["start"]), parser.parse(meet["end"])
            start_date_str, end_date_str = start_date.strftime("%d/%m/%Y, %H:%M"), end_date.strftime("%d/%m/%Y, %H:%M")
            infos_meet = {"name" : meet["name"], "start" : start_date_str, "end" : end_date_str}
            infos_meet["guest_infos"] = []
            for guest in meet["guests"]:
                guest_infos = {"name" : guest["user"]["username"]}
                infos_meet["guest_infos"].append(guest_infos)
            next_meetings.append(infos_meet)
        
    context = {"room": room, "next_meetings":next_meetings}

    return render(request, "room.html", context)

@login_required(login_url='admin/login/?next=')
def building_infos(request, pk):
    building = Building.objects.get(id=pk)

    rooms = Room.objects.filter(building_id=building)

    context = {"building": building, "rooms": rooms}

    return render(request, "building.html", context)

@login_required(login_url='admin/login/?next=')
def add_room(request):

    if request.method == "POST":
        form = RoomForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("data")

    else:
        form = RoomForm()

    context = {"form": form, "title": "Add a room"}

    return render(request, "form.html", context)

@login_required(login_url='admin/login/?next=')
def add_building(request):
    if request.method == "POST":
        form = BuildingForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect("data")

    else:
        form = BuildingForm()

    context = {"form": form, "title": "Add a building"}

    return render(request, "form.html", context)


def logout_user(request):
    logout(request)
    return HttpResponse("Logout successfully")