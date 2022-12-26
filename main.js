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

function renderCurrentData(current) {
  document.querySelector("[data-current-icon]").src = getIcon(
    current.weatherIcon
  );
  
}
