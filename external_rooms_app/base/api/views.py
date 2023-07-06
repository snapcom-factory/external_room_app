# pylint: disable=no-member
import os
import json
import requests
from datetime import datetime
from uuid import uuid4

# from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response

from base.models import Room, Building
from base.api.api import RoomSerializer, BuildingSerializer, InitSerializer
# pylint: disable=import-error
from base.api.fake_data import FAKE_DATA
from cisco.cisco import cisco_init
from keycloak import create_user, get_OIDC, get_meetings

from . import script_meetings
from .utils_meeting import only_3_next_meetings

# Create your views here.

@api_view(['GET'])
def ping(request):
    return Response("ping OK")

@api_view(['GET'])
def get_all_rooms(request):

    rooms = Room.objects.all()

    serialized_rooms = RoomSerializer(rooms, many=True)
    return Response(serialized_rooms.data)

@api_view(['GET'])
def get_all_buildings(request):

    buildings = Building.objects.all()

    serialized_buildings = BuildingSerializer(buildings, many=True)
    return Response(serialized_buildings.data)

@api_view(['GET'])
def modify_bdd(request):

    for building in FAKE_DATA["buildings"]:
        new_building = Building.objects.create(**building)

        new_building.save()

    for room in FAKE_DATA["rooms"]:
        new_room = Room()

        if room["is_init"]:
            new_room.serial_number = room["serial_number"]
            new_room.password_keycloak = room["password_keycloak"]
            new_room.terminal_type = room["terminal_type"]

            new_room.is_init = room["is_init"]
            new_room.ip_terminal = room["ip_terminal"]
            new_room.name = room["name"]
            new_room.number = room["number"]
            new_room.building_id = Building.objects.get(name=room["building_name"])
            new_room.floor = room["floor"]
            new_room.capacity = room["capacity"]
            new_room.has_windows = room["has_windows"]
            new_room.direction = room["direction"]

            new_room.save()

    return HttpResponse("<h1>Normalement c'est updated </h1>")

@api_view(['GET'])
def infos_init(request):
    # Get only the infos that we need in order to select a room
    rooms = Room.objects.all()
    list_infos = []

    for room in rooms:
        tmp_dict = {}
        building = room.building_id
        tmp_dict["room-name"] = room.name
        tmp_dict["building-name"] = building.name
        tmp_dict["city"] = building.city
        tmp_dict["room-id"] = room.id

        list_infos.append(tmp_dict)

    return Response(list_infos)

@api_view(['GET'])
def infos_room(request):
    room_id = request.GET.get("id","")
    room_sn = request.GET.get("sn","")
    room_ip = request.GET.get("ip","")
    if room_id != "":
        room = Room.objects.get(id=room_id)
    elif room_sn != "":
        room = Room.objects.get(serial_number=room_sn)
    elif room_ip != "":
        room = Room.objects.get(ip_terminal=room_ip)
    else:
        raise KeyError("Request has no arguments (id[id], serial_number[sn] or ip_terminal[ip])")

    infos = {"room-infos": RoomSerializer(room).data,
             "building-info": BuildingSerializer(room.building_id).data}

    return Response(infos)

@api_view(['GET'])
def is_empty(request):
    empty = False
    if Room.objects.count() == 0:
        empty = True

    return Response({"is-empty": empty})

@api_view(['GET'])
def delete_room(request, pk):

    Room.objects.get(id=pk).delete()
    return HttpResponse("Normalement c'est delete")

@api_view(['GET'])
def delete_building(request, pk):

    Building.objects.get(id=pk).delete()
    return HttpResponse("Normalement c'est delete aussi")

@api_view(['GET'])
def reset_bdd(request):
    Room.objects.all().delete()
    Building.objects.all().delete()

    return HttpResponse("Tout il est delete")

@api_view(['GET'])
def init_devices(request):
    room_id = request.GET.get("id","")
    if room_id == "": # default to all rooms
        objects = Room.objects.filter(is_init=False)
        devices_to_init = InitSerializer(objects, many=True).data
        for device in devices_to_init:
            if device["terminal_type"] == "cisco":
                cisco_init(device['ip_terminal'])
        return Response(devices_to_init)
    else:
        room = Room.objects.get(id=room_id)
        device = InitSerializer(room).data
        if (device["terminal_type"] == "cisco") and not device["is_init"]:
            cisco_init(device['ip_terminal'])
        return Response(device)

@api_view(['POST'])
def receive_serial_number(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    serial_number = body["sn"]
    terminal_type = body["type"]
    ip_terminal = get_client_ip(request)
    if serial_number:
        try:
            room = Room.objects.get(serial_number=serial_number)
        except:
            # set terminal_type
            Room.objects.filter(ip_terminal=ip_terminal).update(terminal_type=terminal_type)
            # set serial_number
            Room.objects.filter(ip_terminal=ip_terminal).update(serial_number=serial_number)
            # set password_keycloak
            Room.objects.filter(ip_terminal=ip_terminal).update(password_keycloak=str(uuid4()).replace("-",""))
            # set is_init
            Room.objects.filter(ip_terminal=ip_terminal).update(is_init=True)
            # create keycloak user
            room = Room.objects.get(serial_number=serial_number)
            username = f"{room.terminal_type}-{room.serial_number}"
            email = f'{serial_number}@{terminal_type}.com'
            create_user(room.serial_number, room.terminal_type, username, email, room.password_keycloak)
        else:
            raise Exception(f"Room with serial number {serial_number} is already init")
    else:
        raise Exception("Serial number parameter is empty")
    return HttpResponse(f"Received serial_number {serial_number}")

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

@api_view(['GET'])
def get_my_meetings(request):
    ip_terminal = get_client_ip(request)
    room = Room.objects.get(ip_terminal=ip_terminal)
    # get OIDC from keycloak
    username = f"{room.terminal_type}-{room.serial_number}"
    OIDC = get_OIDC(username, room.password_keycloak)
    # get meetings from Magnify
    now = datetime.now()
    futur = now.replace(year = now.year + 1)
    my_meetings = get_meetings(OIDC, now.isoformat(), futur.isoformat())
    my_meetings = only_3_next_meetings(my_meetings)
    return JsonResponse(my_meetings)

@api_view(['GET'])
def get_meetings_room(request, pk):
    ip_terminal = pk
    room = Room.objects.get(ip_terminal=ip_terminal)
    # get OIDC from keycloak
    username = f"{room.terminal_type}-{room.serial_number}"
    OIDC = get_OIDC(username, room.password_keycloak)
    # get meetings from Magnify
    now = datetime.now()
    futur = now.replace(year = now.year + 1)
    my_meetings = get_meetings(OIDC, now.isoformat(), futur.isoformat())
    my_meetings = only_3_next_meetings(my_meetings)
    return JsonResponse(my_meetings)

@api_view(['GET'])
def get_all_meetings(request):

    # On récupère les rooms suceptibles d'avoir des meetings prévus
    rooms = Room.objects.filter(is_init = True)

    result = {}

    for room in rooms:
        username = f"{room.terminal_type}-{room.serial_number}"
        OIDC = get_OIDC(username, room.password_keycloak)
        # get meetings from Magnify
        now = datetime.now()
        futur = now.replace(year = now.year + 1)
        meetings_room = get_meetings(OIDC, now.isoformat(), futur.isoformat())
        meetings_room = only_3_next_meetings(meetings_room)

        result[username] = meetings_room

    return JsonResponse(result)

@api_view(['GET'])
def get_meeting_token(request):
    serial_number = request.GET.get("sn","")
    meeting_id = request.GET.get("id", "")
    room = Room.objects.get(serial_number=serial_number)
    # get OIDC from keycloak
    username = f"{room.terminal_type}-{room.serial_number}"
    OIDC = get_OIDC(username, room.password_keycloak)
    # get meetings from Magnify
    now = datetime.now()
    futur = now.replace(year = now.year + 1)
    my_meetings = get_meetings(OIDC, now.isoformat(), futur.isoformat())

    for meeting in my_meetings["results"]:
        if meeting["jitsi"]["meeting"] == meeting_id:
            return Response(meeting["jitsi"]["token"])

@api_view(['GET'])
def create_fake_meeting(request):
    script_meetings.set_up_meeting(verbose=True)
    return HttpResponse("Fake meeting was created")

@api_view(['GET'])
def switch_mode(request, mode):
    os.environ["MODE"] = mode
    return HttpResponse(f"Switch to mode {mode.upper()}")
