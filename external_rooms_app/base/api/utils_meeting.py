from datetime import datetime, timedelta
from dateutil import parser
import json
import pytz

from django.utils import timezone

from ..models import Terminal
from . import script_meetings

def only_3_next_meetings(meetings_json):
    
    meetings_copy = meetings_json.copy()
    meetings_copy["results"] = sorted(
        meetings_copy["results"], 
        key= lambda x: parser.parse(x["start"]),
        reverse=False,
    )

    def meta_fn(x):
        now = datetime.now(tz=pytz.timezone("Europe/Paris")).replace(tzinfo=None)
        return (parser.parse(x["end"]).replace(tzinfo = None) >= now)

    meetings_copy["results"] = list(filter(lambda x: meta_fn(x), meetings_copy["results"]))
    meetings_copy["results"] =  meetings_copy["results"][:min(3, len(meetings_copy["results"]))]

    return meetings_copy

def meetings_are_the_same(meeting1, meeting2):

    same_owner = meeting1["owner"] == meeting2["owner"]
    same_name = meeting1["name"] == meeting2["name"]
    same_start = meeting1["start"] == meeting2["start"]
    same_end = meeting1["end"] == meeting2["end"]

    same_no_guests = len(meeting1["guests"]) == len(meeting2["guests"])
    same_guests = True
    if same_no_guests:
        for guest1 in meeting1["guests"]:
            guest1_in_meeting2 = False
            for guest2 in meeting2["guests"]:
                if guest1["user"]["username"] == guest2["user"]["username"]:
                    guest1_in_meeting2 = True
                    break

            if not guest1_in_meeting2:
                same_guests = False
                break
    
    return same_owner and same_name and same_start and same_end and same_no_guests and same_guests

def handle_meeting_creation(data):

    name_meeting = data.get("name_meeting")
    start_date = data.get("start_date")
    room_names = data.get("rooms")

    devices = []
    for room_name in room_names:
        terminal = Terminal.objects.get(name=room_name)
        dic = {
            "terminal_type" : terminal.terminal_type,
            "serial_number" : terminal.serial_number,
            "password" : terminal.password_keycloak,
            "exists" : terminal.is_init
        }

        devices.append(dic)

    script_meetings.set_up_meeting(
        meeting_name=name_meeting,
        start_date=start_date,
        devices=devices,
    )