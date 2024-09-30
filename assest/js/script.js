const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const errorMessage = document.createElement('p');

errorMessage.style.color = 'red';
errorMessage.style.textAlign = 'center';
errorMessage.style.marginTop = '20px';

search.addEventListener('click', () => {
    const APIKey = '3f71208b60a9230bf88aadc101109d77';
    const city = document.querySelector('.search-box input').value.trim();

    errorMessage.textContent = '';

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                errorMessage.textContent = 'City not found. Please try again.';
                container.appendChild(errorMessage);
                return;
            }

            errorMessage.textContent = '';
            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'block';
            container.style.height = '590px';

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'assets/img/clear.png';
                    break;
                case 'Rain':
                    image.src = 'assets/img/rain.png';
                    break;
                case 'Snow':
                    image.src = 'assets/img/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'assets/img/cloud.png';
                    break;
                case 'Haze':
                    image.src = 'assets/img/mist.png';
                    break;
                default:
                    image.src = '';
            }
        })
     
});
