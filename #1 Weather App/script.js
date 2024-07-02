function getWeather() {
    var city = document.getElementById('cityInput').value;
    var apiKey = 'd0557824134a76f646a0ad15ca59beae';
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.log('Error fetching weather data:', error);
        });
}

function displayWeather(data) {
    var weatherInfoDiv = document.getElementById('weatherInfo');
    var iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    weatherInfoDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${iconUrl}" alt="Weather Icon" style="display: block; margin: 0 auto; width: 100px height: 100px;">
        <p>Weather: ${data.weather[0].main}</p>
        <p>Description: ${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
    `;
}





// Function to fetch weather data based on user input
async function getWeather() {
    const cityInput = document.getElementById('cityInput').value;

    // Check if the city input is not empty
    if (cityInput.trim() === '') {
        alert('Please enter a valid location.');
        return;
    }

    const apiKey = 'd0557824134a76f646a0ad15ca59beae'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const weatherData = await response.json();

        if (response.ok) {
            // Display weather information
            displayWeather(weatherData);
        } else {
            // Display error message for invalid location
            displayErrorMessage();
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('An error occurred while fetching weather data. Please try again.');
    }
}

// Function to display weather information
function displayWeather(weatherData) {
    const weatherIconElement = document.getElementById('weatherIcon');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const humidityValueElement = document.getElementById('humidityValue');
    const windSpeedValueElement = document.getElementById('windSpeedValue');

    // Update weather icon, temperature, and description
    const weatherIcon = weatherData.weather[0].icon;
    const temperature = Math.round(weatherData.main.temp);
    const description = weatherData.weather[0].description;

    weatherIconElement.src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
    weatherIconElement.alt = description;
    temperatureElement.textContent = `${temperature}°C`;
    descriptionElement.textContent = description;

    // Update humidity and wind speed values
    const humidityValue = weatherData.main.humidity;
    const windSpeedValue = weatherData.wind.speed;

    humidityValueElement.textContent = `${humidityValue}%`;
    windSpeedValueElement.textContent = `${windSpeedValue} m/s`;

    // Show weather info display area
    const weatherBox = document.querySelector('.weather-box');
    weatherBox.style.display = 'block';

    // Show weather details display area
    const weatherDetails = document.querySelector('.weather-details');
    weatherDetails.style.display = 'flex';
}

// Function to display error message for invalid location
function displayErrorMessage() {
    const weatherBox = document.querySelector('.weather-box');
    const notFoundElement = document.createElement('div');
    notFoundElement.classList.add('not-found');

    const errorImage = document.createElement('img');
    errorImage.src = 'images/404.png';
    errorImage.alt = 'Error';

    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Oops! Invalid location :/';

    notFoundElement.appendChild(errorImage);
    notFoundElement.appendChild(errorMessage);

    // Replace weather box content with error message
    weatherBox.innerHTML = '';
    weatherBox.appendChild(notFoundElement);

    // Hide weather details display area
    const weatherDetails = document.querySelector('.weather-details');
    weatherDetails.style.display = 'none';

    // Show weather info display area
    weatherBox.style.display = 'block';
}
