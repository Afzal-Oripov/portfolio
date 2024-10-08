import os
import django
import telebot

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')  # Replace with your actual project name
django.setup()


bot = telebot.TeleBot('7176087052:AAEEuwoJd6SBYJBJT3dGkS3ZbUPqGYOIy_c')
admins = [1495634955]

@bot.message_handler(commands=['getchatid'])
def chatid(message):
    try:
        bot.send_message(message.chat.id, message.chat.id)
    except Exception as e:
        print(f"Error sending chat ID: {e}")

@bot.message_handler(commands=['start'])
def start(message):
    try:
        bot.send_message(message.chat.id, 'hello')
    except Exception as e:
        print(f"Error sending start message: {e}")

@bot.message_handler(commands=['hello'])
def start(message):
    try:
        bot.send_message(message.chat.id, 'Hello, my dear Afzal!')
    except Exception as e:
        print(f"Error sending start message: {e}")
        
bot.polling()
