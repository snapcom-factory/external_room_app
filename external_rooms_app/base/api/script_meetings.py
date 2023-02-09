from datetime import datetime, timedelta
from base.models import Room
from keycloak import *
import pytz

USERS_ALREADY_EXIST_IN_KEYCLOAK = True

DEVICES = [
    {
        "terminal_type" : "pulse",
        "serial_number" : "88888888",
        "password" : "password",
        "exists" : USERS_ALREADY_EXIST_IN_KEYCLOAK,
    },
    {
        "terminal_type" : "cisco",
        "serial_number" : "979823",
        "password" : "password",
        "exists" : USERS_ALREADY_EXIST_IN_KEYCLOAK,
    },
    {
        "terminal_type" : "cisco",
        "serial_number" : "000000000",
        "password" : "password",
        "exists" : USERS_ALREADY_EXIST_IN_KEYCLOAK,
    }
]

MEETING_NAME = "Super Sardine Party XXL"

START_DATE = datetime(2023,5,21,16,18,0).replace(tzinfo=None)


def set_up_meeting(verbose=True, meeting_name = MEETING_NAME, devices = DEVICES, start_date = START_DATE):
    """ Set up a DEMO meeting"""

    # create users if they don't exist
    for device in devices:
        if not device["exists"]:
            device_username = f'{device["terminal_type"]}-{device["serial_number"]}'
            create_user(
                device["serial_number"],
                device["terminal_type"],
                device_username,
                device_username + "@gmail.com",
                device["password"],
            )
            # init terminals
            room = Room.objects.get(serial_number=device["serial_number"],terminal_type=device["terminal_type"])
            Room.objects.filter(ip_terminal=room.ip_terminal).update(is_init=True)

    # get OIDC from keycloak
    OIDC = {}
    if verbose:
        print("\n# FAKE MEETING PLANIFICATION :")
        print("\nOIDC :")
    for device in devices:
        device_username = f'{device["terminal_type"]}-{device["serial_number"]}'
        device["username"] = device_username
        OIDC[device_username] = get_OIDC(device_username, device["password"])
        if verbose:
            print(f"{device_username} : {OIDC[device_username][:20]}...")

    # get user_id from Magnify using the OIDC
    USER_ID = {}
    if verbose:
        print("\nUSER ID :")
    for device in devices:
        device_username = device["username"]
        oidc = OIDC[device_username]
        USER_ID[device_username] = get_user_id(oidc)
        if verbose:
            print(f"{device_username} : {USER_ID[device_username]}")

    # create a 1 hour meeting starting in OFFSET
    tz=pytz.timezone("Europe/Paris")
    # OFFSET = timedelta(minutes=1)
    # start_date = datetime.now(tz = tz).replace(tzinfo = None) + OFFSET
    start_date = start_date - timedelta(hours=1) # fix UTC/UTC+1 bug
    end_date = start_date.replace(hour = start_date.hour + 1)

    CREATOR_USERNAME = devices[0]["username"] # 1st device by default

    create_meeting(
        OIDC[CREATOR_USERNAME],
        meeting_name,
        start_date.isoformat(),
        end_date.isoformat(),
    )

    # get the meeting (between now and now + 1 year)
    now = datetime.now(tz = tz).replace(tzinfo = None)
    the_meeting = get_meetings(
        OIDC[CREATOR_USERNAME],
        now.isoformat(),
        now.replace(year = now.year + 1).isoformat(),
    )

    MEETING_UUID = the_meeting["results"][0]["id"]

    # add people to the meeting
    for k in range(1,len(devices)):
        device_username = devices[k]["username"]
        print(USER_ID[device_username])
        add_to_meeting(
            OIDC[CREATOR_USERNAME],
            USER_ID[device_username],
            MEETING_UUID,
        )

    # get the meeting (between now and now + 1 year)
    now = datetime.now(tz = tz).replace(tzinfo = None)
    the_meeting = get_meetings(
        OIDC[CREATOR_USERNAME],
        now.isoformat(),
        now.replace(year = now.year + 1).isoformat(),
    )

    if verbose:
        print("\nMEETING :")
        print(the_meeting)