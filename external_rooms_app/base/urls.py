from django.urls import path
from .views import render_frontend

urlpatterns = [
    path("", render_frontend, name="react-frontend"),
]