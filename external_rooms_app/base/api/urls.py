from django.urls import path
from . import views


urlpatterns = [
    path("ping/", views.ping, name="ping"),
    # for frontend
    path("new-meeting/", views.create_meeting, name="new-meeting"),

    path("rooms/", views.get_all_rooms, name="get-rooms"),
    path("buildings/", views.get_all_buildings, name="get-buildings"),
    path("terminals/", views.get_all_terminals, name="get-terminals"),

    path("add-room/", views.add_room, name="add-room"),
    path("add-building/", views.add_building, name="add-building"),
    path("add-terminal/", views.add_terminal, name="add-terminal"),

    path("delete-room/<str:pk>", views.delete_room, name="delete-room"),
    path("delete-building/<str:pk>", views.delete_building, name="delete-building"),
    path("delete-terminal/<str:pk>", views.delete_terminal, name="delete-terminal"),

    path("bdd/", views.modify_bdd, name="modif-bdd"),
    path("infos/", views.infos_init, name="infos"),
    path("infos-room/", views.infos_room, name="infos-room"),
    path("empty/", views.is_empty, name="empty"),
    path("reset-bdd/", views.reset_bdd, name="reset-bdd"),
    path("init/", views.init_devices, name="init-devices"),
    # for devices
    path("serial-number/", views.receive_serial_number, name="serial-number"),
    path("get-meetings/", views.get_my_meetings, name="get-meetings"),
    path("get-meetings-room/<str:pk>", views.get_meetings_room, name="get-meetings-room"),
    path("get-meeting-token", views.get_meeting_token, name="get-meeting-token"),
    # for push method
    path("get-all-meetings/", views.get_all_meetings, name="get-all-meetings"),
    # fake meeting
    path("fake-meeting/", views.create_fake_meeting, name="fake-meeting"),
    # get Keycloak URL to Front
    path("get-keycloak-url", views.get_keycloak_url, name="get-keycloak-url")
]
   
