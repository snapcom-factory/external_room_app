from django.contrib import admin

# Register your models here.
from .models import Room, Building, Terminal

admin.site.register(Room)
admin.site.register(Building)
admin.site.register(Terminal)