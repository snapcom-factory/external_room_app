from django.urls import path
from . import views

from django.contrib.auth import views as auth_views

urlpatterns = [
    path("", views.data, name="data"),
    path("room/<str:pk>", views.room_infos, name="room"),
    path("building/<str:pk>", views.building_infos, name="building"),
    path("add-room", views.add_room, name="add-room"),
    path("add-building", views.add_building, name="add-building"),
    path("logout", views.logout_user, name="logout"),
]
