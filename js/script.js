import { URL } from "./util.js";

// Функция для получения и обработки данных
        async function fetchUsers() {
            try {
              // console.log('Fetching data from:', `${URL}/photos/`);
                // Отправка запроса к JSONPlaceholder API
                const response = await fetch(`${URL}/photos?_limit=6`);
                if (!response.ok) {
                    throw new Error('Ошибка сети');
                }

                // Преобразование полученного ответа в формат JSON
                const photos = await response.json();

                // Получение контейнера для отображения данных
                const container = document.getElementById('users-container');
                container.innerHTML = ''; // Очищаем контейнер, если нужно

                // Обработка каждого пользователя и добавление информации на страницу
                photos.forEach(photo => {
                    const userElement = document.createElement('div');
                    userElement.classList.add('photosImage');
                    userElement.style.border = "1px solid #fcfcfc";
                    // userElement.style.margin = "0 auto";
                    userElement.style.padding = "10px";
                    userElement.style.marginBottom = "20px";
                    userElement.style.width = "800px";
                    userElement.style.color = "white";
                    
                    userElement.innerHTML = `
                        <h2>${photo.title}</h2>
                        
                        <img src=${photo.url} alt="photo">
                        <p><strong>ID:</strong> ${photo.id}</p>
                    `;
                    container.appendChild(userElement);
                });

            } catch (error) {
                console.error('Ошибка:', error);
            }
        }

        // Вызов функции при загрузке страницы
        window.onload = fetchUsers;

// writer
const str = "В нашем магазине Вы всегда найдете товар по Вашему вкусу и по Вашим возможностям!";
const out = document.querySelector('.out');

let position = 0;

const typeText = () => {
  if (position === str.length) return;
  const v = getRandomInt(1, 100);
  if (v > 90 && position !== 0) {
    out.textContent += str[getRandomInt(0, str.length - 2)];
    setTimeout(removeLastChar, 1000);
  }  else {
    out.textContent += str[position];
    position++;
    setTimeout(typeText, getRandomInt());
  }
}

const removeLastChar = () => {
  out.textContent = str.substring(0, position);
  setTimeout(typeText, getRandomInt());
}
function getRandomInt(min = 10, max = 45) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

typeText();

// отправка письма на почту
let selector = document.querySelector("#tel");
let im = new Inputmask("+7(999) 999-99-99");
im.mask(selector);
let validation = new JustValidate("form");

validation.addField("#name", [
  {
    rule: "required",
    error: "Пожалуйста, введите Ваше имя"
  },
  {
    rule: "minLength",
    value: 3,
    errorMessage: "Имя должно быть не менее из 3 символов"
  }
]).addField("#tel", [
  {
    validator: (value) => {
      const phone = selector.inputmask.unmaskedvalue()
      return Boolean(Number(phone) && phone.length > 0)
    },
    errorMessage: 'Введите телефон'
  },
  {
    validator: (value) => {
      const phone = selector.inputmask.unmaskedvalue()
      return Boolean(Number(phone) && phone.length === 10)
    },
    errorMessage: 'Введите телефон полностью'
  }
]).addField("#msg", [
  {
    rule: "required",
    error: "Пожалуйста, введите Ваше сообщение"
  },
  {
    rule: "minLength",
    value: 10,
    errorMessage: "В сообщении должно быть не менее 10 символов"
  }
]).onSuccess(async function () {
  let data = {
    name: document.getElementById('name').value,
    tel: selector.inputmask.unmaskedvalue(),
    msg: document.getElementById('msg').value
  }

  let response = await fetch("mail.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    }
  })

  let result = await response.text()

  alert(result)
})
