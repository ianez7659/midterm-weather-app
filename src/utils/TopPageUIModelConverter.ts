import {
  TopPageUIModel,
  CurrentWeatherCardUIModel,
  DailyForecastSectionUIModel,
  HourlyForecastSectionUIModel,
} from "../uimodels/TopPageUIModel";
import { CurrentWeatherResponse } from "../responses/CurrentWeatherResponse";
import { ForecastResponse } from "../responses/ForecastResponse";
import { LocationResponse } from "../responses/LocationResponse";
import { extractTimeOnly } from "../utils/TimeUtils";

const bgSunnyImagePath = "src/assets/backgroundimages/bg-sunny.png";
const bgCloudyImagePath = "src/assets/backgroundimages/bg-cloudy.png";
const bgRainyImagePath = "src/assets/backgroundimages/bg-rainy.png";
const bgSnowImagePath = "src/assets/backgroundimages/bg-snow.png";

const weatherCodeToBackgroundImage = (code: number): string => {
  const weatherMap: { [key: number]: string } = {
    0: bgSunnyImagePath,
    1: bgSunnyImagePath,
    2: bgCloudyImagePath,
    3: bgCloudyImagePath,
    45: bgCloudyImagePath,
    48: bgCloudyImagePath,
    51: bgRainyImagePath,
    53: bgRainyImagePath,
    55: bgRainyImagePath,
    61: bgRainyImagePath,
    63: bgRainyImagePath,
    65: bgRainyImagePath,
    71: bgSnowImagePath,
    73: bgSnowImagePath,
    75: bgSnowImagePath,
    77: bgSnowImagePath,
    80: bgRainyImagePath,
    81: bgRainyImagePath,
    82: bgRainyImagePath,
    85: bgSnowImagePath,
    86: bgSnowImagePath,
    95: bgRainyImagePath,
    96: bgRainyImagePath,
    99: bgRainyImagePath,
  };
  return weatherMap[code] || bgSunnyImagePath;
};

const weatherCodeToWeather = (code: number): string => {
  const weatherMap: { [key: number]: string } = {
    0: "Clear",
    1: "Mainly Clear",
    3: "Overcast",
    45: "Fog",
    48: "Depositing Rime Fog",
    51: "Light Drizzle",
    2: "Partly Cloudy",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    61: "Slight Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    71: "Slight Snow",
    73: "Moderate Snow",
    75: "Heavy Snow",
    77: "Snow Grains",
    80: "Slight Rain Showers",
    81: "Moderate Rain Showers",
    82: "Violent Rain Showers",
    85: "Slight Snow Showers",
    86: "Heavy Snow Showers",
    95: "Thunderstorm",
    96: "Thunderstorm with Slight Hail",
    99: "Thunderstorm with Heavy Hail",
  };
  return weatherMap[code] || "Unknown";
};

export const convertToTopPageUIModel = (
  currentWeatherResponse: CurrentWeatherResponse,
  forecastResponse: ForecastResponse,
  location: LocationResponse
): TopPageUIModel => {
  const currentWeather: CurrentWeatherCardUIModel = {
    location: location.city,
    temperature: currentWeatherResponse.current_weather.temperature,
    humidity: currentWeatherResponse.relativehumidity_2m,
    pressure: currentWeatherResponse.surface_pressure,
    windSpeed: currentWeatherResponse.current_weather.windspeed,
    windDirection: currentWeatherResponse.current_weather.winddirection,
    weather: weatherCodeToWeather(
      currentWeatherResponse.current_weather.weathercode
    ),
    favoriteButton: {
      cityName: location.city,
      latitude: location.latitude,
      longitude: location.longitude,
    },
  };

  const dailyForecast: DailyForecastSectionUIModel = {
    forecasts: forecastResponse.daily.time.map((date, index) => ({
      date,
      weather: weatherCodeToWeather(forecastResponse.daily.weathercode[index]),
      minTemp: forecastResponse.daily.temperature_min[index],
      maxTemp: forecastResponse.daily.temperature_max[index],
    })),
  };

  const hourlyForecast: HourlyForecastSectionUIModel = {
    forecasts: forecastResponse.hourly.time
      .map((time, index) => ({
        time: extractTimeOnly(time),
        temperature: forecastResponse.hourly.temperature[index],
        humidity: forecastResponse.hourly.relativehumidity_2m[index],
        weather: weatherCodeToWeather(
          forecastResponse.hourly.weathercode[index]
        ),
      }))
      // Filter 3 hourly forecast
      .filter((_, index) => index % 3 === 0)
      // Limit to 8 forecasts
      .slice(0, 8),
  };

  return {
    type: "success",
    currentWeather,
    dailyForecast,
    hourlyForecast,
  };
};
