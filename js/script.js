import { URL } from "./util.js";

// Функция для получения и обработки данных
        async function fetchUsers() {
            try {
              console.log('Fetching data from:', `${URL}/photos/`);
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
function getRandomInt(min = 15, max = 350) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

typeText();
