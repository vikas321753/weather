async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "76445b4cbf2773e7ed5398dee69d6e8c"; // Your actual API key
  const weatherInfo = document.getElementById("weatherInfo");

  if (!city) {
    weatherInfo.innerHTML = "Please enter a city name.";
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);

    // Check if response is not OK (e.g., 401, 404, 429)
    if (!response.ok) {
      const errorData = await response.json();
      weatherInfo.innerHTML = `Error: ${errorData.message}`;
      return;
    }

    const data = await response.json();
    const { name, main, weather, wind } = data;

    weatherInfo.innerHTML = `
      <h2>${name}</h2>
      <p><strong>Temperature:</strong> ${main.temp}°C</p>
      <p><strong>Weather:</strong> ${weather[0].description}</p>
      <p><strong>Humidity:</strong> ${main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
    `;
  } catch (error) {
    weatherInfo.innerHTML = "An unexpected error occurred. Please check your internet connection.";
    console.error("Network or other error:", error);
  }
}
