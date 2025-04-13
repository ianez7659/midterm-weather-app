export interface TopPageUIModel {
  currentWeather: CurrentWeatherCardUIModel;
  dailyForecast: DailyForecastSectionUIModel;
  hourlyForecast: HourlyForecastSectionUIModel;
} 

export interface CurrentWeatherCardUIModel {
  location: string;
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  weather: string;
} 

export interface DailyForecastSectionUIModel {
  forecasts: Array<{
    date: string;
    weather: string;
    minTemp: number;
    maxTemp: number;
  }>;
} 

export interface HourlyForecastSectionUIModel {
  forecasts: Array<{
    time: string;
    temperature: number;
    humidity: number;
    weather: string;
  }>;
} 