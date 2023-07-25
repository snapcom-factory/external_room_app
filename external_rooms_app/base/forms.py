from django import forms
from .models import Room


class CSVForm(forms.Form):
    file = forms.FileField()

class MeetingForm(forms.Form):

    name_meeting = forms.CharField(label="Nom de la réunion")

    start_date = forms.DateTimeField(label="Date et Heure (Y-m-d H:M:S)")

    def get_my_choices(self):
        return [(room.name, room.name) for room in Room.objects.filter(is_init = True)]

    def __init__(self, *args, **kwargs):
        super(MeetingForm, self).__init__(*args, **kwargs)     
        self.fields['rooms'] = forms.MultipleChoiceField(
            label="Salles",
            widget=forms.CheckboxSelectMultiple,
            choices= self.get_my_choices(),
        )
