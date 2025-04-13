import { CurrentWeatherResponse } from '../responses/CurrentWeatherResponse';
import { ForecastResponse } from '../responses/ForecastResponse';
import { WEATHER_CODES } from '../constants/weatherCodes';

const BASE_URL = 'https://api.open-meteo.com/v1';

export const getCurrentWeather = async (latitude: number, longitude: number): Promise<CurrentWeatherResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m,surface_pressure`
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
      `${BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&forecast_days=5`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }

    const data = await response.json();
    return {
      ...data,
      hourly: {
        ...data.hourly,
      },
      daily: {
        ...data.daily,
      }
    } as ForecastResponse;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
}; 