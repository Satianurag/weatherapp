const apiKey = '80f98a028b75c790d7b933199ef9e197';

async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim(); // Trim to remove leading and trailing whitespaces

    if (!cityName) {
        alert('Please enter a city name');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            alert(`Error: ${data.message || response.statusText}`);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const temperature = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius

    const html = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;

    weatherInfo.innerHTML = html;
}

// Add an event listener to trigger getWeather() when the Enter key is pressed
document.getElementById('cityInput').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});
