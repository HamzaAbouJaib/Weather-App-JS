import getWeatherInfo from './weatherInfo'

navigator.geolocation.getCurrentPosition(positionSuccess, () => {});

function positionSuccess({ coords }) {
    getWeatherInfo(
    coords.latitude,
    coords.longitude,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
    .then(data => console.log(data))
    .catch((e) => {
      console.error(e);
      alert("Error: " + e.message);
    });
}
