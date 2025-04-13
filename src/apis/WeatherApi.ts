import { CurrentWeatherResponse } from '../responses/CurrentWeatherResponse';
import { ForecastResponse } from '../responses/ForecastResponse';
import { WEATHER_CODES } from '../constants/weatherCodes';

const BASE_URL = 'https://api.open-meteo.com/v1';

export const getCurrentWeather = async (latitude: number, longitude: number): Promise<CurrentWeatherResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    const weatherCode = data.current_weather.weathercode;
    
    return {
      current_weather: {
        ...data.current_weather,
        weather: WEATHER_CODES[weatherCode] || 'No weather code'
      }
    }
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
        weather: data.hourly.weathercode.map((code: number) => WEATHER_CODES[code] || 'No weather code')
      },
      daily: {
        ...data.daily,
        weather: data.daily.weathercode.map((code: number) => WEATHER_CODES[code] || 'No weather code')
      }
    } as ForecastResponse;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
}; 