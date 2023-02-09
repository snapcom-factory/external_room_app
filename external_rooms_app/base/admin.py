from django.contrib import admin

# Register your models here.
from .models import Room, Building

admin.site.register(Room)
admin.site.register(Building)