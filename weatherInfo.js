import axios from "axios";

const API = "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,visibility,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,windspeed_10m_max&current_weather=true&timeformat=unixtime"

export default getWeatherInfo = (lat, lon, timezone) => {
  return axios.get(API, {
    params: {
        latitude: lat,
        longitude: lon,
        timezone: timezone
    }
  }).then(({data}) => {
    return data;
  });
};
