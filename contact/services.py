# contact/services.py
import requests
from django.utils import timezone
from datetime import timedelta
from .models import Message
import logging

# Настройка логирования
logger = logging.getLogger(__name__)

# Замените на ваш токен Telegram бота и ID чата
TELEGRAM_BOT_TOKEN = '7176087052:AAEEuwoJd6SBYJBJT3dGkS3ZbUPqGYOIy_c'
TELEGRAM_CHAT_ID = '1495634955'

def get_message_count(phone):
    """Возвращает количество сообщений, отправленных с указанного номера за последние 24 часа."""
    one_day_ago = timezone.now() - timedelta(days=1)
    count = Message.objects.filter(phone=phone, timestamp__gte=one_day_ago).count()
    logger.info(f"Проверка номера {phone}: найдено {count} сообщений за последние 24 часа.")
    return count

def send_message_to_telegram(name, phone, message):
    """Отправляет сообщение в Telegram."""
    telegram_url = f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage'
    text = f'Новая заявка:\nИмя: {name}\nТелефон: {phone}\nСообщение: {message}'
    payload = {'chat_id': TELEGRAM_CHAT_ID, 'text': text}
    response = requests.post(telegram_url, data=payload)
    
    if response.status_code != 200:
        logger.error(f"Ошибка при отправке сообщения: {response.status_code}, {response.text}")
    else:
        logger.info(f"Сообщение отправлено успешно: {text}")

def log_and_send_message(name, phone, message):
    """Записывает сообщение в базу данных и отправляет в Telegram."""
    Message.objects.create(name=name, phone=phone, message=message)
    logger.info(f"Сообщение отправлено от {name} ({phone}): {message}")
    send_message_to_telegram(name, phone, message)
