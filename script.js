const input_box = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.getElementById('weather-img')
const temprature = document.querySelector(".temprature");
const description = document.querySelector(".description");
const humidity = document.getElementById(".humidity");
const wind_speed = document.getElementById("wind-speed");
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.getElementById('weather-body');

async function checkWeather(city) {
  const api_key = "bd915e45ce1b82632f97a61b08ff9d37";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );

  if(weather_data.cod === `404`){
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    return;
  }

  location_not_found.style.display = "none";
  weather_body.style.display = "flex";

  temprature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  description.innerHTML = `${weather_data.weather[0].description}`;
  what();
  function what() {
    document.getElementById(
      "humidity"
    ).innerHTML = `${weather_data.main.humidity}%`;
  }

  wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

  if (weather_data.weather[0].main == "Clouds") {
    weather_img.src = "/WeatherApp/assets/cloud.png";
  } else if (weather_data.weather[0].main == "Clear") {
    weather_img.src = "/WeatherApp/assets/clear.png";
  } else if (weather_data.weather[0].main == "Mist") {
    weather_img.src = "/WeatherApp/assets/mist.png";
  } else if (weather_data.weather[0].main == "Rain") {
    weather_img.src = "/WeatherApp/assets/rain.png";
  } else if (weather_data.weather[0].main == "Snow") {
    weather_img.src = "/WeatherApp/assets/snow.png";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(input_box.value);
});
