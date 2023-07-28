# Generated by Django 4.1.5 on 2023-01-25 10:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Building",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=200)),
                ("address", models.CharField(default="Unknown", max_length=300)),
                ("city", models.CharField(max_length=200)),
                ("postal_code", models.CharField(max_length=200)),
                ("country", models.CharField(default="France", max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name="Room",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=200)),
                ("number", models.CharField(blank=True, max_length=200, null=True)),
                ("floor", models.IntegerField(blank=True, null=True)),
                ("direction", models.CharField(max_length=200)),
                ("capacity", models.IntegerField(blank=True, null=True)),
                ("has_windows", models.BooleanField(default=True)),
                ("ip_terminal", models.CharField(max_length=200, unique=True)),
                (
                    "serial_number",
                    models.CharField(
                        blank=True, max_length=200, null=True, unique=True
                    ),
                ),
                (
                    "terminal_type",
                    models.CharField(
                        default='cisco',
                        max_length=200,
                        null=True,
                    ),
                ),
                ("is_init", models.BooleanField(default=False)),
                (
                    "password_keycloak",
                    models.CharField(blank=True, max_length=300, null=True),
                ),
                (
                    "building_id",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="base.building",
                    ),
                ),
            ],
        ),
    ]
