export interface CurrentWeatherResponse {
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    time: string;
    weather: string;
  };
} 