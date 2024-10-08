# views.py
from django.contrib import messages
from django.shortcuts import render
from contact.forms import MessagesForm
from .services import get_message_count, log_and_send_message

def home(request):
    form = MessagesForm(request.POST or None)
    phone = request.POST.get('phone') if request.method == 'POST' else None
    message_count = get_message_count(phone) if phone else 0

    if request.method == 'POST' and form.is_valid():
        name = form.cleaned_data['name']
        phone = form.cleaned_data['phone']
        message = form.cleaned_data['message']

        if not all([name, phone, message]):
            messages.error(request, "Все поля должны быть заполнены.")
            return render(request, "base.html", {'form': form, 'message_count': message_count})

        if message_count >= 3:
            messages.error(request, "Вы можете отправлять не более 3 сообщений в день.")
            return render(request, "base.html", {'form': form, 'message_count': message_count})

        log_and_send_message(name, phone, message)
        messages.success(request, "Сообщение отправлено успешно!")
        form = MessagesForm()  # Очищаем форму

    return render(request, "base.html", {'form': form, 'message_count': message_count})
