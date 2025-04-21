import {
  TopPageUIModel,
  CurrentWeatherCardUIModel,
  DailyForecastSectionUIModel,
  HourlyForecastSectionUIModel,
  BackgroundImageUIModel,
} from "../uimodels/TopPageUIModel";
import { CurrentWeatherResponse } from "../responses/CurrentWeatherResponse";
import { ForecastResponse } from "../responses/ForecastResponse";
import { LocationResponse } from "../responses/LocationResponse";
import { extractTimeOnly } from "../utils/TimeUtils";
import { escape } from "querystring";

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
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing Rime Fog",
    51: "Light Drizzle",
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

const iconCloudyImagePath = "src/assets/icons/weather-cloudy.svg";
const iconFogImagePath = "src/assets/icons/weather-fog.svg";
const iconPartlyCloudyImagePath = "src/assets/icons/weather-partly cloudy.svg";
const iconRainImagePath = "src/assets/icons/weather-rain.svg";
const iconSnowImagePath = "src/assets/icons/weather-snow.svg";
const iconSunnyImagePath = "src/assets/icons/weather-sunny.svg";
const iconThunderstormImagePath = "src/assets/icons/weather-thunderstorm.svg";

const weatherCodeToIconImage = (code: number): string => {
  const weatherMap: { [key: number]: string } = {
    0: iconSunnyImagePath,
    1: iconSunnyImagePath,
    2: iconPartlyCloudyImagePath,
    3: iconCloudyImagePath,
    45: iconFogImagePath,
    48: iconFogImagePath,
    51: iconRainImagePath,
    53: iconRainImagePath,
    55: iconRainImagePath,
    61: iconRainImagePath,
    63: iconRainImagePath,
    65: iconRainImagePath,
    71: iconSnowImagePath,
    73: iconSnowImagePath,
    75: iconSnowImagePath,
    77: iconSnowImagePath,
    80: iconRainImagePath,
    81: iconRainImagePath,
    82: iconRainImagePath,
    85: iconSnowImagePath,
    86: iconSnowImagePath,
    95: iconThunderstormImagePath,
    96: iconThunderstormImagePath,
    99: iconThunderstormImagePath,
  };
  return weatherMap[code] || iconSunnyImagePath;
};

export const convertToTopPageUIModel = (
  currentWeatherResponse: CurrentWeatherResponse,
  forecastResponse: ForecastResponse,
  location: LocationResponse
): TopPageUIModel => {
  const currentWeather: CurrentWeatherCardUIModel = {
    location: location.city.split(",")[0].trim(),
    date: new Date().toISOString().split("T")[0],
    temperature: currentWeatherResponse.current_weather.temperature,
    humidity: currentWeatherResponse.relativehumidity_2m,
    pressure: currentWeatherResponse.surface_pressure,
    windSpeed: currentWeatherResponse.current_weather.windspeed,
    windDirection: currentWeatherResponse.current_weather.winddirection,
    weather: weatherCodeToWeather(
      currentWeatherResponse.current_weather.weathercode
    ),
    weatherIconImagePath: weatherCodeToIconImage(
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
      weatherIconImagePath: weatherCodeToIconImage(
        forecastResponse.daily.weathercode[index]
      ),
    })),
  };

  // const hourlyForecast: HourlyForecastSectionUIModel = {
  //   forecasts: forecastResponse.hourly.time
  //     .map((time, index) => ({
  //       time: extractTimeOnly(time),
  //       temperature: forecastResponse.hourly.temperature[index],
  //       humidity: forecastResponse.hourly.relativehumidity_2m[index],
  //       weather: weatherCodeToWeather(
  //         forecastResponse.hourly.weathercode[index]
  //       ),
  //       weatherIconImagePath: weatherCodeToIconImage(
  //         forecastResponse.hourly.weathercode[index]
  //       ),
  //     }))
  //     // Filter 3 hourly forecast
  //     .filter((_, index) => index % 3 === 0)
  //     // Limit to 8 forecasts
  //     .slice(0, 8),
  // };
  const hourlyByDate: HourlyForecastSectionUIModel["hourlyByDate"] = {};

  forecastResponse.hourly.time.forEach((timestamp, index) => {
    if (index % 3 !== 0) return;

    const [date] = timestamp.split("T");
    const entry = {
      time: extractTimeOnly(timestamp), // pass full timestamp
      temperature: forecastResponse.hourly.temperature[index],
      humidity: forecastResponse.hourly.relativehumidity_2m[index],
      weather: weatherCodeToWeather(forecastResponse.hourly.weathercode[index]),
      weatherIconImagePath: weatherCodeToIconImage(
        forecastResponse.hourly.weathercode[index]
      ),
    };

    if (!hourlyByDate[date]) hourlyByDate[date] = [];
    if (hourlyByDate[date].length < 8) hourlyByDate[date].push(entry);
  });

  const sortedDates = Object.keys(hourlyByDate).sort();

  const hourlyForecast: HourlyForecastSectionUIModel = {
    forecasts: hourlyByDate[Object.keys(hourlyByDate)[0]], // default: today
    hourlyByDate,
  };

  const backgroundImage: BackgroundImageUIModel = {
    imagePath: weatherCodeToBackgroundImage(
      currentWeatherResponse.current_weather.weathercode
    ),
  };

  return {
    type: "success",
    currentWeather,
    dailyForecast,
    hourlyForecast,
    backgroundImage,
  };
};
