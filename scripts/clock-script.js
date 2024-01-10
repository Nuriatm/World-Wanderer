document.addEventListener("DOMContentLoaded", function () {
  const cities = [
    { name: "GMT", coords: [0, 0], timeZone: "UTC" },
    {
      name: "London",
      coords: [51.509865, -0.118092],
      timeZone: "Europe/London",
    },
    { name: "Tokyo", coords: [35.6895, 139.6917], timeZone: "Asia/Tokyo" },
    {
      name: "New York",
      coords: [40.7128, -74.006],
      timeZone: "America/New_York",
    },
    {
      name: "Brasília",
      coords: [-15.7801, -47.9292],
      timeZone: "America/Sao_Paulo",
    },
    {
      name: "Sydney",
      coords: [-33.8688, 151.2093],
      timeZone: "Australia/Sydney",
    },
    {
      name: "Hong Kong",
      coords: [22.3193, 114.1694],
      timeZone: "Asia/Hong_Kong",
    },
    { name: "Dubai", coords: [25.276987, 55.296249], timeZone: "Asia/Dubai" },
    { name: "Moscow", coords: [55.7558, 37.6176], timeZone: "Europe/Moscow" },
  ];

  const map = L.map("map").setView([0, 0], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  cities.forEach((city) => {
    const marker = L.marker(city.coords).addTo(map);

    marker.bindPopup(`<b>${city.name}</b><br>${getTimeInCity(city.timeZone)}`);
  });

  document.querySelectorAll(".city-name").forEach((cityElement) => {
    cityElement.addEventListener("click", () => {
      const cityName = cityElement.getAttribute("data-city");
      console.log("Cidade clicada:", cityName);

      scrollToCity(cityName, cities, map);
      scrollToMap();
    });
  });

  setInterval(updateClock, 1000);
  updateClock();
});

function getTimeInCity(timeZone) {
  const now = new Date().toLocaleString("pt-BR", { timeZone: timeZone });
  const [date, time] = now.split(", "); // Separar a data e a hora
  return `${date}<br>${time}`;
}

function scrollToMap() {
  const mapElement = document.getElementById("map");
  mapElement.scrollIntoView({ behavior: "smooth" });
}

function scrollToCity(cityName, cities, map) {
  const city = cities.find((c) => c.name === cityName);

  if (city) {
    map.panTo(city.coords);
  }
}

function updateClock() {
  function getTimeInCity(timeZone, elementId) {
    const now = new Date().toLocaleString("pt-BR", { timeZone: timeZone });
    const [date, time] = now.split(", "); // Separar a data e a hora em duas linha
    document.getElementById(
      elementId
    ).innerHTML = `<div>${date}<br>${time}</div>`;
  }

  // UTC, GMT, CET
  getTimeInCity("UTC", "utc");
  getTimeInCity("GMT", "gmt");
  getTimeInCity("Europe/Berlin", "cet");

  getTimeInCity("Asia/Tokyo", "tokyo");
  getTimeInCity("America/New_York", "new-york");
  getTimeInCity("Europe/London", "london");
  getTimeInCity("America/Sao_Paulo", "brazil");
  getTimeInCity("Australia/Sydney", "sydney");
  getTimeInCity("Asia/Hong_Kong", "hong-kong");
  getTimeInCity("Asia/Dubai", "dubai");
  getTimeInCity("Europe/Moscow", "moscow");
}
