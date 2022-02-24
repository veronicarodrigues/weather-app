let now = new Date();
let dateTime = document.querySelector("#date-time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
dateTime.innerHTML = `${day} ${hour}:${minutes}`;

function getCity(fullData) {
  let city = fullData.data.name;
  let country = fullData.data.sys.country;
  document.querySelector("#city-display").innerHTML = `${city}, ${country}`;
  let temperatureCelisus = Math.round(fullData.data.main.temp);
  document.querySelector("#temperature").innerHTML = temperatureCelisus;
  document.querySelector("#humidity").innerHTML = fullData.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    fullData.data.wind.speed
  );
}

function search(event) {
  event.preventDefault();
  let apiKey = "23a42024d4ea98a857d3b3b4b4f71a2a";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let unit = "metric";
  let cityInput = document.querySelector("#search-city-input");
  let cityClean = cityInput.value.trim();
  let apiUrl = `${apiEndpoint}?q=${cityClean}&appid=${apiKey}&units=${unit}`;
  if (cityClean.length > 0) {
    axios.get(apiUrl).then(getCity);
  } else {
    alert(`Please type a city`);
  }
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", search);

function getCurrentInfo(data) {
  let city = data.data.name;
  let country = data.data.sys.country;
  document.querySelector("#city-display").innerHTML = `${city}, ${country}`;
  let temperatureCelisus = Math.round(data.data.main.temp);
  document.querySelector("#temperature").innerHTML = temperatureCelisus;
  document.querySelector("#humidity").innerHTML = data.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(data.data.wind.speed);
}

function showPosition(position) {
  let apiKey = "23a42024d4ea98a857d3b3b4b4f71a2a";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let unit = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getCurrentInfo);
}

function searchCurrent(askLocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", searchCurrent);

function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(
    currentTemperature.innerHTML * 1.8 + 32
  );
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(
    (5 / 9) * (currentTemperature.innerHTML - 32)
  );
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
