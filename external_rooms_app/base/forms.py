from django import forms
from .models import Room, Building


class RoomForm(forms.ModelForm):

    class Meta:
        model = Room
        # fields = "__all__"
        fields = ["name", "number", "building_id", "floor",
                  "capacity", "direction", "has_windows", "ip_terminal"]
        labels = {
            "name": "Nom" ,
            "number":"Numéro ",
            "building_id":"Emplacement ",
            "floor":"Étage ",
            "capacity":"Capacité ",
            "direction": "Direction " ,
            "has_windows":"Équipée de fenêtres ",
            "ip_terminal": "IP du Terminal ",
        }
        widgets = {
            "name": forms.TextInput(attrs={"placeholder": "Nom de la salle", "style": "width: 100%;", "class": "form-control", "autofocus": "true"}),
            "number": forms.TextInput(attrs={"placeholder": "Numéro de la salle", "style": "width: 100%;", "class": "form-control"}),
            "building_id": forms.Select(attrs={"placeholder": "Emplacement de la salle", "style": "width: 100%;", "class": "form-select"}),
            "floor": forms.NumberInput(attrs={"placeholder": "Étage de la salle", "style": "width: 100%;", "class": "form-control"}),
            "capacity": forms.NumberInput(attrs={"placeholder": "Capacité de la salle", "style": "width: 100%;", "class": "form-control"}),
            "direction": forms.TextInput(attrs={"placeholder": "Direction chargée de la salle", "style": "width: 100%;", "class": "form-control"}),
            "has_windows": forms.CheckboxInput(),
            "ip_terminal": forms.TextInput(attrs={"placeholder": "Pays de la salle", "style": "width: 100%;", "class": "form-control"}),
        }


class BuildingForm(forms.ModelForm):

    class Meta:
        model = Building
        fields = ["name", "address", "city", "postal_code", "country"]
        labels = {
            "name": "Nom" ,
            "address":"Adresse ",
            "city":"Ville ",
            "postal_code": "Code postal ",
            "country":"Pays ",
        }
        widgets = {
            "name": forms.TextInput(attrs={"placeholder": "Nom de l'emplacement", "style": "width: 100%;", "class": "form-control", "autofocus": "true"}),
            "address": forms.TextInput(attrs={"placeholder": "Adresse de l'emplacement", "style": "width: 100%;", "class": "form-control"}),
            "city": forms.TextInput(attrs={"placeholder": "Ville de l'emplacement", "style": "width: 100%;", "class": "form-control"}),
            "postal_code": forms.TextInput(attrs={"placeholder": "Code postal de l'emplacement", "style": "width: 100%;", "class": "form-control"}),
            "country": forms.TextInput(attrs={"placeholder": "Pays de l'emplacement", "style": "width: 100%;", "class": "form-control"}),
        }


class CSVForm(forms.Form):
    file = forms.FileField(label="Fichier ", widget=forms.FileInput(attrs={"placeholder": "test"}))

class MeetingForm(forms.Form):

    name_meeting = forms.CharField(label="Nom ", widget=forms.TextInput(attrs={"placeholder": "Nom de la réunion", "style": "width: 100%;", "class": "form-control", "autofocus": "true"}))

    start_date = forms.DateTimeField(label="Date et heure (Y-m-d H:M:S) ", widget=forms.TextInput(attrs={"placeholder": "Date de la réunion", "style": "width: 100%;", "class": "form-control"}))

    def get_my_choices(self):
        return [(room.name, room.name) for room in Room.objects.filter(is_init = True)]

    def __init__(self, *args, **kwargs):
        super(MeetingForm, self).__init__(*args, **kwargs)     
        self.fields["rooms"] = forms.MultipleChoiceField(
            label="Salles participantes ",
            widget=forms.CheckboxSelectMultiple,
            choices= self.get_my_choices(),
            
        )
