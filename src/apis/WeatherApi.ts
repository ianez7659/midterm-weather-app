import { CurrentWeatherResponse } from '../responses/CurrentWeatherResponse';
import { ForecastResponse } from '../responses/ForecastResponse';

const BASE_URL = 'https://api.open-meteo.com/v1';

export const getCurrentWeather = async (latitude: number, longitude: number): Promise<CurrentWeatherResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,surface_pressure,weathercode&forecast_days=1`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    return {
      current_weather: data.current_weather,
      relativehumidity_2m: data.hourly.relativehumidity_2m[0],
      surface_pressure: data.hourly.surface_pressure[0]
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getForecast = async (latitude: number, longitude: number): Promise<ForecastResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,weathercode,relativehumidity_2m,surface_pressure&daily=weathercode,temperature_2m_max,temperature_2m_min&forecast_days=5`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }

    const data = await response.json();
    return {
      hourly: {
        time: data.hourly.time,
        temperature: data.hourly.temperature_2m,
        precipitation_probability: data.hourly.precipitation_probability,
        weathercode: data.hourly.weathercode,
        relativehumidity_2m: data.hourly.relativehumidity_2m,
        surface_pressure: data.hourly.surface_pressure
      },
      daily: {
        time: data.daily.time,
        temperature_max: data.daily.temperature_2m_max,
        temperature_min: data.daily.temperature_2m_min,
        weathercode: data.daily.weathercode
      }
    };
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
}; 