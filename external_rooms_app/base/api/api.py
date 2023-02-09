from rest_framework.serializers import ModelSerializer

from base.models import Room, Building

class RoomSerializer(ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"

class BuildingSerializer(ModelSerializer):
    class Meta:
        model = Building
        fields = "__all__"

class InitSerializer(ModelSerializer):
    class Meta:
        model = Room
        fields = ["id","name","ip_terminal","terminal_type","is_init"]