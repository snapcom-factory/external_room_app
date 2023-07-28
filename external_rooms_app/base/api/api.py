from rest_framework import serializers
from base.models import Room, Building, Terminal


class TerminalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Terminal
        fields = "__all__"

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"

class BuildingSerializer(serializers.ModelSerializer):
    # rooms = RoomSerializer(instance="rooms", many=True, read_only=True)

    class Meta:
        model = Building
        # fields = ["name", "address", "city", "postal_code", "country", "rooms"]
        fields = "__all__"