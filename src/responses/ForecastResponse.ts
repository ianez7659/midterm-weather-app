export interface ForecastResponse {
  hourly: {
    time: string[];
    temperature: number[];
    precipitation_probability: number[];
    weathercode: number[];
    weather: string[];
  };
  daily: {
    time: string[];
    temperature_max: number[];
    temperature_min: number[];
    weathercode: number[];
    weather: string[];
  };
} 