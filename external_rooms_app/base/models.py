from django.db import models

# Create your models here.


class Building(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=300, default="Unknown")
    city = models.CharField(max_length=200)
    postal_code = models.CharField(max_length=200)
    country = models.CharField(max_length=200, default="France")

    def __str__(self):
        return self.name


class Room(models.Model):

    # Infos annexes
    name = models.CharField(max_length=200)
    number = models.CharField(max_length=200, null=True, blank=True)
    building_id = models.ForeignKey(
        Building, on_delete=models.CASCADE, null=True, blank=True)
    floor = models.IntegerField(null=True, blank=True)
    direction = models.CharField(max_length=200)
    capacity = models.IntegerField(null=True, blank=True)
    has_windows = models.BooleanField(default=True)

    # Infos pour magnify et les terminaux
    ip_terminal = models.CharField(max_length=200, unique=True)
    serial_number = models.CharField(
        max_length=200, unique=True, null=True, blank=True)
    terminal_type = models.CharField(max_length=200, null=True, blank=True, default="cisco")
    is_init = models.BooleanField(default=False)
    password_keycloak = models.CharField(max_length=300, null=True, blank=True)

    def __str__(self):
        return self.name
