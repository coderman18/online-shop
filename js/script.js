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