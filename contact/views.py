from django.contrib import messages
import requests
from django.shortcuts import render
from contact.forms import MessagesForm
from django.utils import timezone

# Replace with your Telegram bot token and chat ID
TELEGRAM_BOT_TOKEN = '7176087052:AAEEuwoJd6SBYJBJT3dGkS3ZbUPqGYOIy_c'
TELEGRAM_CHAT_ID = '1495634955'

# Dictionary to store timestamps for each user
user_timestamps = {}

def home(request):
    if request.method == 'POST':
        form = MessagesForm(request.POST)
        if form.is_valid():
            # Extracting data from the form
            name = form.cleaned_data['name']
            phone = form.cleaned_data['phone']
            message = form.cleaned_data['message']
            print(f"Данные формы: Имя: {name}, Телефон: {phone}, Сообщение: {message}")  # Debug output
            
            # Check if the user has sent a message within the last hour
            current_time = timezone.now()
            if phone in user_timestamps:
                last_sent_time = user_timestamps[phone]
                if (current_time - last_sent_time).total_seconds() < 3600:  # 1 hour limit
                    messages.error(request, "Вы можете отправить сообщение только раз в час.")
                    return render(request, "base.html", {'form': MessagesForm()})
            
            # Send data to Telegram
            send_to_telegram(name, phone, message)

            # Update the timestamp for the user
            user_timestamps[phone] = current_time
            
            messages.success(request, "Сообщение отправлено успешно!")
            
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
    
    # Check the response from Telegram
    if response.status_code != 200:
        print(f"Ошибка при отправке сообщения: {response.status_code}, {response.text}")
    else:
        print(f"Сообщение отправлено успешно: {text}")
    
    return response


