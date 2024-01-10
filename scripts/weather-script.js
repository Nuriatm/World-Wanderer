// Função para buscar informações de clima
async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=54fa945c0c33405b99a191907231412&q=${city}`
    );
    const data = await response.json();

    // infos weather
    const weatherDetails = {
      temperatureCelsius: data.current.temp_c,
      temperatureFahrenheit: data.current.temp_f,
      feelsLikeCelsius: data.current.feelslike_c,
      feelsLikeFahrenheit: data.current.feelslike_f,
      conditionText: data.current.condition.text,
      windSpeedKph: data.current.wind_kph,
      windDirection: data.current.wind_dir,
      pressureMb: data.current.pressure_mb,
      humidity: data.current.humidity,
      uvIndex: data.current.uv,
      cloudCover: data.current.cloud,
      isDay: data.current.is_day,
      conditionCode: data.current.condition.code,
    };

    return weatherDetails;
  } catch (error) {
    console.error("Erro ao buscar informações de clima:", error);
    throw error;
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const apiKey = "54fa945c0c33405b99a191907231412";
  const weatherInfoElement = document.getElementById("weather-info");

  // Carregue o JSON
  const response = await fetch("weather_conditions.json");
  const conditionJson = await response.json();

  // Função para obter a URL da imagem com base no código de condição
  function getImageUrl(conditionCode) {
    const imageMap = conditionJson.reduce((acc, condition) => {
      acc[condition.code] = `./weather/${condition.icon}.png`;
      return acc;
    }, {});

    const defaultImage = "unknown.png";
    return imageMap[conditionCode] || defaultImage;
  }

  // Adicione informações de clima para cada cidade
  const cities = ["London", "New York", "Tokyo"];
  const searchButton = document.getElementById("search-button");
  const cityInput = document.getElementById("city-input");

  searchButton.addEventListener("click", async function () {
    const cityName = cityInput.value.trim();

    if (cityName) {
      try {
        // Limpe as informações existentes
        weatherInfoElement.innerHTML = "";

        const weatherDetails = await fetchWeather(cityName);

        // Crie um elemento HTML para mostrar as informações e a imagem
        const cityElement = document.createElement("div");
        const imageUrl = getImageUrl(weatherDetails.conditionCode);

        cityElement.innerHTML = `
          <strong>${cityName}</strong><img id="icon" src="${imageUrl}" alt="Weather Image"><br>
          <strong>Temperature:</strong> ${
            weatherDetails.temperatureCelsius
          }°C / ${weatherDetails.temperatureFahrenheit}°F<br>
          <strong>Feels Like:</strong> ${weatherDetails.feelsLikeCelsius}°C / ${
          weatherDetails.feelsLikeFahrenheit
        }°F<br>
          <strong>Condition:</strong> ${weatherDetails.conditionText}<br>
          <strong>Wind Speed:</strong> ${weatherDetails.windSpeedKph} km/h<br>
           <strong>Direction:</strong> ${weatherDetails.windDirection}<br>
          <strong>Pressure:</strong> ${weatherDetails.pressureMb} mb<br>
          <strong>Humidity:</strong> ${weatherDetails.humidity}%<br>
          <strong>UV Index:</strong> ${weatherDetails.uvIndex}<br>
          <strong>Cloud Cover:</strong> ${weatherDetails.cloudCover}%<br>
          <strong>Is Day:</strong> ${weatherDetails.isDay ? "Yes" : "No"}<br>
        `;

        // Aplica estilos para centralizar o texto
        cityElement.style.textAlign = "center";
        cityElement.style.margin = "10px 0";

        weatherInfoElement.appendChild(cityElement);
      } catch (error) {
        console.error("Erro ao buscar informações de clima:", error);
      }
    }
  });
  cityInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      searchButton.click();
    }
  });

  for (const city of cities) {
    const weatherDetails = await fetchWeather(city);

    const cityElement = document.createElement("div");
    const imageUrl = getImageUrl(weatherDetails.conditionCode);

    cityElement.innerHTML = `
      <strong>${city}</strong><img id="icon" src="${imageUrl}" alt="Weather Image"><br>
      <strong>Temperature:</strong> ${weatherDetails.temperatureCelsius}°C / ${
      weatherDetails.temperatureFahrenheit
    }°F<br>
      <strong>Feels Like:</strong> ${weatherDetails.feelsLikeCelsius}°C / ${
      weatherDetails.feelsLikeFahrenheit
    }°F<br>
      <strong>Condition:</strong> ${weatherDetails.conditionText}<br>
      <strong>Wind Speed:</strong> ${weatherDetails.windSpeedKph} km/h<br>
       <strong>Direction:</strong> ${weatherDetails.windDirection}<br>
      <strong>Pressure:</strong> ${weatherDetails.pressureMb} mb<br>
      <strong>Humidity:</strong> ${weatherDetails.humidity}%<br>
      <strong>UV Index:</strong> ${weatherDetails.uvIndex}<br>
      <strong>Cloud Cover:</strong> ${weatherDetails.cloudCover}%<br>
      <strong>Is Day:</strong> ${weatherDetails.isDay ? "Yes" : "No"}<br>
    `;

    cityElement.style.textAlign = "center";
    cityElement.style.margin = "10px 0";

    weatherInfoElement.appendChild(cityElement);
  }
});
