import axios from "axios";

const API =
  "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,visibility,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,windspeed_10m_max&current_weather=true&timeformat=unixtime";

export default async function getWeatherInfo(lat, lon, timezone) {
  return axios
    .get(API, {
      params: {
        latitude: lat,
        longitude: lon,
        timezone: timezone,
      },
    })
    .then(({ data }) => {
      return data;
      return {
        current: getCurrentData(data),
        daily: getDailyData(data)
      };
    });
}

function getCurrentData({ current_weather, daily }) {
  const { temperature: currentTemp, windspeed, weathercode } = current_weather;
  const {
    apparent_temperature_max: FLHigh,
    apparent_temperature_min: FLLow,
    precipitation_sum: precip,
    sunrise,
    sunset,
    temperature_2m_max: maxTemp,
    temperature_2m_min: minTemp,
  } = daily;

  return {
    currentTemp: currentTemp,
    maxTemp: maxTemp[0],
    minTemp: minTemp[0],
    FLHigh: FLHigh[0],
    FLLow: FLLow[0],
    windSpeed: windspeed,
    sunrise: sunrise[0],
    sunset: sunset[0],
    precip: precip[0],
    weatherIcon: weathercode,
  };
}

function getDailyData({daily}){
  return daily.time.map((time, index) => {
    return {
      time: time*1000,
      weatherIcon: daily.weathercode[index],
      maxTemp: daily.temperature_2m_max[index],
    }
  })
}
