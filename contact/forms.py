from django import forms
from .models import *

class MessagesForm(forms.ModelForm):
    class Meta:
            model = Message
            fields = ['name', 'phone', 'message']