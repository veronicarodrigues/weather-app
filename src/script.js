let now = new Date();
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
document.querySelector("#date-time").innerHTML = `${day} ${hour}:${minutes}`;

function formatDate(timestamp) {
  let now = new Date(timestamp);
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
  return `${day} ${hour}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="https://ssl.gstatic.com/onebox/weather/64/sunny.png"
                  alt="icon"
                  width="42"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max">4°</span>
                  <span class="weather-forecast-temperature-min">-3°</span>
              </div>
            </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getCity(fullData) {
  let city = fullData.data.name;
  let country = fullData.data.sys.country;
  let descriptionElement = document.querySelector("#description");
  let dateTime = document.querySelector("#date-time");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = fullData.data.main.temp;
  document.querySelector("#city-display").innerHTML = `${city}, ${country}`;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = fullData.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    fullData.data.wind.speed
  );
  descriptionElement.innerHTML = fullData.data.weather[0].description;
  dateTime.innerHTML = formatDate(fullData.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${fullData.data.weather[0].icon}@2x.png`
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
  let temperatureCelisus = Math.round(data.data.main.temp);
  let dateTime = document.querySelector("#date-time");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  document.querySelector("#city-display").innerHTML = `${city}, ${country}`;
  document.querySelector("#temperature").innerHTML = temperatureCelisus;
  document.querySelector("#humidity").innerHTML = data.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(data.data.wind.speed);
  dateTime.innerHTML = formatDate(data.data.dt * 1000);
  descriptionElement.innerHTML = data.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`
  );
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
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

displayForecast();
