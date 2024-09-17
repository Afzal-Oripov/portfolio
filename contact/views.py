import requests
from django.shortcuts import render
from contact.forms import MessagesForm

# Replace with your Telegram bot token and chat ID
TELEGRAM_BOT_TOKEN = '7176087052:AAEEuwoJd6SBYJBJT3dGkS3ZbUPqGYOIy_c'
TELEGRAM_CHAT_ID = '1495634955'

def send_to_telegram(name, phone, message):
    telegram_url = f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage'
    text = f'Новая заявка:\nИмя: {name}\nТелефон: {phone}\nСообщение: {message}'
    payload = {
        'chat_id': TELEGRAM_CHAT_ID,
        'text': text
    }
    response = requests.post(telegram_url, data=payload)
    return response

def home(request):
    if request.method == 'POST':
        form = MessagesForm(request.POST)
        if form.is_valid():
            # Save the form data to the database (optional)
            form.save()
            # Extract form data
            name = form.cleaned_data['name']
            phone = form.cleaned_data['phone']
            message = form.cleaned_data['message']
            # Send data to Telegram
            send_to_telegram(name, phone, message)
            # Optionally, add a success message or redirect
    else:
        form = MessagesForm()
    return render(request, "base.html", {'form': form})
