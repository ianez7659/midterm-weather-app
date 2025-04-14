export interface ForecastResponse {
  hourly: {
    time: string[];
    temperature: number[];
    precipitation_probability: number[];
    weathercode: number[];
    relativehumidity_2m: number[];
    surface_pressure: number[];
  };
  daily: {
    time: string[];
    temperature_max: number[];
    temperature_min: number[];
    weathercode: number[];
  };
} 