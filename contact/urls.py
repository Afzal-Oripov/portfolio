# contact/urls.py
from django.urls import path
from . import views

app_name = 'contact'

urlpatterns = [
    path('', views.home, name='contact_view'),
    # Добавьте другие URL-паттерны для контактов здесь
]
