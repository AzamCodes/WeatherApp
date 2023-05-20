const apikey = "86952b428811a205d042fd83c564442f";

const weatherDataE1 = document.getElementById("weather-data");
const cityInput = document.getElementById("city-input");

const formE1 = document.querySelector("form");
formE1.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInput.value;
  getweatherData(cityValue);
});

async function getweatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
    const temperature = Math.round(data.main.temp);

    const description = data.weather[0].description;

    const icon = data.weather[0].icon;

    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity:   ${data.main.humidity} %`,
      `Wind Speed: ${data.wind.speed} m/s`,
    ];

    weatherDataE1.querySelector(".icon").innerHTML = `
      <img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather" />
    `;
    weatherDataE1.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;
    weatherDataE1.querySelector(".description").textContent = description;

    weatherDataE1.querySelector(".detail").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherDataE1.querySelector(".icon").innerHTML = "";
    weatherDataE1.querySelector(".temperature").textContent = "";
    weatherDataE1.querySelector(".description").textContent =
      "An Error Occured, Please Try Again Latera";

    weatherDataE1.querySelector(".detail").innerHTML = "";
  }
}
