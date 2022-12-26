import getWeatherData from "./weatherInfo";
import {ICON_MAP} from './weatherIconMap';

navigator.geolocation.getCurrentPosition(positionSuccess, () => {});

function positionSuccess({ coords }) {
  getWeatherData(
    coords.latitude,
    coords.longitude,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
    .then((data) => renderWeatherData(data))
    .catch((e) => {
      console.error(e);
      alert("Error: " + e.message);
    });
}

function renderWeatherData({ current, daily, hourly }) {
  renderCurrentData(current);
  // renderDailyData(daily)
  // renderHourlyData(hourly)
  document.body.classList.remove("blurred");
}

function getIcon(iconCode) {
  return `public/${ICON_MAP.get(iconCode)}.svg`;
}

function setData(selector, value, parent) {
  parent.querySelector(`[data-${selector}]`).textContent = value;
}

function formatTime(time){
  return new Intl.DateTimeFormat(undefined, { hour: "numeric" }).format(time);
}

function renderCurrentData(current) {
  document.querySelector("[data-current-icon]").src = getIcon(
    current.weatherIcon
  );
  setData("current-temp", current.currentTemp, document)
  setData("current-high", current.maxTemp, document)
  setData("current-low", current.minTemp, document)
  setData("current-fl-high", current.FLHigh, document)
  setData("current-fl-low", current.FLLow, document)
  setData("current-wind", current.windSpeed, document)
  setData("current-precip", current.precip, document)
  setData("current-sunrise", formatTime(current.sunrise), document)
  setData("current-sunset", formatTime(current.sunset), document)
}
