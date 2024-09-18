document.addEventListener("DOMContentLoaded", function() {
    console.log("1");
    const TOKEN = '7176087052:AAEEuwoJd6SBYJBJT3dGkS3ZbUPqGYOIy_c';
    const CHAT_ID = '-4524063943';
    const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    const succes = document.querySelector('.succes');
    const form = document.querySelector('.contact__form.contact__content');


    if (!form) {
        console.error("Форма не найдена!");
        return; // Прекратить выполнение, если форма не найдена
    }

    console.log("Форма найдена!");
    succes.classList.add('disp'); // Скрываем сообщение по умолчанию

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log("Форма отправлена!"); // Проверка отправки формы

        let message = 'Заявка с сайта\n' + 
                      'Имя: ' + this.name.value + '\n' + 
                      'Номер телефона: ' + this.phone.value + '\n' +
                      'Сообшения: ' + this.message.value;

        console.log("Сообщение для отправки:", message); // Проверка сообщения

        axios.post(URL_API, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: message
        })
        .then((res) => {
            console.log("Сообщение успешно отправлено!", res); // Ответ от API
            succes.classList.remove('disp'); // Показываем сообщение об успешной отправке
        })
        .catch((err) => {
            console.error("Ошибка при отправке сообщения:", err); // Лог ошибки
        })
        .finally(() => {
            console.log("Скрипт завершен!"); // Завершение выполнения
        });
    });
});
