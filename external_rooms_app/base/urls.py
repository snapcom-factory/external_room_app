from django.urls import path
from . import views
from django.views.generic import TemplateView

from django.contrib.auth import views as auth_views

urlpatterns = [
    path("", TemplateView.as_view(template_name='index.html')),
]
