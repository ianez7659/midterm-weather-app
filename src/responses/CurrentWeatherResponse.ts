export interface CurrentWeatherResponse {
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    time: string;
  };
  relativehumidity_2m: number;
  surface_pressure: number;
} 