document.addEventListener("DOMContentLoaded", function() {
    console.log("1");
    const TOKEN = '7176087052:AAEEuwoJd6SBYJBJT3dGkS3ZbUPqGYOIy_c';
    const CHAT_ID = '-4524063943';
    const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    const succes = document.querySelector('.succes');
    const form = document.querySelector('.contact__form.contact__content');
    
    if (!form) {
        console.error("Форма не найдена!");
        return;
    }

    console.log("Форма найдена!");
    succes.classList.add('disp');

    // Store timestamps for each user
    const userTimestamps = {};

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log("Форма отправлена!");

        const userIdentifier = this.phone.value; // Use a unique identifier
        const currentTime = Date.now();

        // Log current time and last sent time
        console.log(`Current time: ${currentTime}`);
        console.log(`Last sent time for ${userIdentifier}: ${userTimestamps[userIdentifier] || 'No messages sent yet'}`);

        // Check if the user has sent a message within the last hour
        if (userTimestamps[userIdentifier] && (currentTime - userTimestamps[userIdentifier]) < 3600000) {
            alert('Вы можете отправить сообщение только раз в час.');
            console.log(`Message limit reached for ${userIdentifier}.`);
            return;
        }

        let message = 'Заявка с сайта\n' + 
                      'Имя: ' + this.name.value + '\n' + 
                      'Номер телефона: ' + this.phone.value + '\n' +
                      'Сообщения: ' + this.message.value;

        console.log("Сообщение для отправки:", message);

        axios.post(URL_API, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: message
        })
        .then((res) => {
            console.log("Сообщение успешно отправлено!", res);
            succes.classList.remove('disp');
            userTimestamps[userIdentifier] = currentTime; // Update the timestamp
            console.log(`Updated timestamp for ${userIdentifier}: ${currentTime}`);
        })
        .catch((err) => {
            console.error("Ошибка при отправке сообщения:", err);
        })
        .finally(() => {
            console.log("Скрипт завершен!");
        });
    });
});
