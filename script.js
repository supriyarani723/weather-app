const apiKey = 'ac8a80f3676cd4932e0bfa71c981c22e';

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

async function fetchWeather(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather data not found.");

    const data = await response.json();
    displayWeather(data);
    updateBackground();
  } catch (err) {
    showError(err.message);
  }
}

function displayWeather(data) {
  document.getElementById('weatherResult').innerHTML = `
    <div class="temperature">${data.main.temp} °C</div>
    <div class="description">${data.weather[0].description}</div>
    <div class="details">
      <div><strong>Humidity:</strong> ${data.main.humidity}%</div>
      <div><strong>Wind Speed:</strong> ${data.wind.speed} m/s</div>
    </div>
  `;
}

function showError(message) {
  document.getElementById('weatherResult').innerHTML = `<p style="color: red;">${message}</p>`;
}

function updateBackground() {
  document.getElementById('weatherBox').style.background = '';
}
