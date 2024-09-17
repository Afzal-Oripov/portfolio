import telebot
import django
import os

bot = telebot.TeleBot('7176087052:AAEEuwoJd6SBYJBJT3dGkS3ZbUPqGYOIy_c')
admins = [1495634955]


@bot.message_handler(commands=['getchatid'])
def chatid(message):
    bot.send_message(message.chat.id, message.chat.id)

@bot.message_handler(commands=['start'])
def start(message):
    bot.send_message(message.chat.id, 'hello')

bot.infinity_polling()
