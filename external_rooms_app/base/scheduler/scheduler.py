from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore
from apscheduler.triggers.cron import CronTrigger

import os
import json
import requests
from ..models import Room
from ..api.utils_meeting import meetings_are_the_same
from datetime import timedelta
from dateutil import parser

last_dic_of_meetings = {}

def post_meetings(ip, data_meetings):
    url = f'http://{ip}/putxml'
    headers = {'Content-Type':'text/xml', 'Authorization':'Basic Y2VudHJhbGU6ZHR5Y2VudHJhbGVjaXNjbw=='}

    s = ""
    for i, meeting in enumerate(data_meetings["results"]):
        duration = (parser.parse(meeting["end"]) - parser.parse(meeting["start"]))
        duration = duration.total_seconds()
        duration = int(duration / 60)

        s += f'''{{
                "Id": "{i + 1}",
                "Title" : "{meeting["name"]}",
                "Number" : "{meeting["jitsi"]["meeting"]}@webconf.snapcom.fr",
                "Protocol" : "SIP",
                "Organizer" : {{
                    "Name" : "DTY"
                }},
                "Time" : {{
                    "StartTime" : "{meeting["start"]}",
                    "Duration" : {duration}
                }}
            }}'''
        if i < len(data_meetings["results"]) - 1:
            s += ","
    data = f'''<Command>
                    <Bookings>
                        <Put>
                            <body>
                                {{"Bookings" : [{s}]}}
                            </body>
                        </Put>
                    </Bookings>
                </Command>'''

    x = requests.post(url, headers=headers, data=data)
    if not x.ok:
        raise Exception('Could not post meetings: ' + x.text)

def pull_meetings_and_update():
    if os.environ.get("MODE") == "push":
        global last_dic_of_meetings
        all_meetings_dict = requests.get("http://localhost:8000/api/get-all-meetings/")
        if not all_meetings_dict.ok :
            raise Exception("An error occured while getting pulling the meetings : " + all_meetings_dict.text)
        else:
            all_meetings_dict = all_meetings_dict.json()
        for user in all_meetings_dict.keys():
            room = Room.objects.get(serial_number = user.split("-")[1])
            ip_terminal = room.ip_terminal
            if user not in last_dic_of_meetings.keys():
                data_meetings = all_meetings_dict[user]
                post_meetings(ip_terminal, data_meetings=data_meetings)
                continue

            meets_changed = False
            for meeting1 in all_meetings_dict[user]["results"]:
                same_meeting = False
                for meeting2 in last_dic_of_meetings[user]["results"]:
                    if meetings_are_the_same(meeting1, meeting2):
                        same_meeting = True
                        break

                if not same_meeting:
                    meets_changed=True
                    data_meetings = all_meetings_dict[user]
                    post_meetings(ip_terminal, data_meetings=data_meetings)
                    break

            if (len(all_meetings_dict[user]["results"]) != len(last_dic_of_meetings[user]["results"])):
                data_meetings = all_meetings_dict[user]
                post_meetings(ip_terminal, data_meetings=data_meetings)


        last_dic_of_meetings = all_meetings_dict.copy()

def start():

    try :
        scheduler = BackgroundScheduler()
        scheduler.add_jobstore(DjangoJobStore(), "default")

        scheduler.add_job(
            pull_meetings_and_update,
            trigger=CronTrigger(second="*/5"),
            id="pull_meetings",
            replace_existing=True,
            unique=True
        )

        scheduler.start()
    except:
        print("Une erreur s'est produite lors du makemigrations/migrate, cela est normal car on essaie d'ajouter un 'django_appscheduler_djangojob' à une table qui n'existe pas encore avant de migrate")
