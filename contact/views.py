from django.contrib import messages
import requests
from django.shortcuts import render
from contact.forms import MessagesForm

# Replace with your Telegram bot token and chat ID
TELEGRAM_BOT_TOKEN = '7176087052:AAEEuwoJd6SBYJBJT3dGkS3ZbUPqGYOIy_c'
TELEGRAM_CHAT_ID = '1495634955'


def home(request):
    if request.method == 'POST':
        form = MessagesForm(request.POST)
        if form.is_valid():
            # Сохранение данных формы в базе данных (опционально)
            form.save()
            # Извлечение данных формы
            name = form.cleaned_data['name']
            phone = form.cleaned_data['phone']
            message = form.cleaned_data['message']
            print(f"Данные формы: Имя: {name}, Телефон: {phone}, Сообщение: {message}")  # Отладочный вывод
            
            # Отправка данных в Telegram
            send_to_telegram(name, phone, message)
            messages.success(request, "Сообщение отправлено успешно!")
            return render(request, "base.html", {'form': MessagesForm()})
    else:
        form = MessagesForm()
    return render(request, "base.html", {'form': form})

def send_to_telegram(name, phone, message):
    telegram_url = f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage'
    text = f'Новая заявка:\nИмя: {name}\nТелефон: {phone}\nСообщение: {message}'
    payload = {
        'chat_id': TELEGRAM_CHAT_ID,
        'text': text
    }
    response = requests.post(telegram_url, data=payload)
    
    # Проверка ответа от Telegram
    if response.status_code != 200:
        print(f"Ошибка при отправке сообщения: {response.status_code}, {response.text}")
    else:
        print(f"Сообщение отправлено успешно: {text}")
    
    return response

