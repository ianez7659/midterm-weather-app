export type TopPageUIModel =
  | {
      type: "success";
      currentWeather: CurrentWeatherCardUIModel;
      dailyForecast: DailyForecastSectionUIModel;
      hourlyForecast: HourlyForecastSectionUIModel;
      backgroundImage: BackgroundImageUIModel;
    }
  | {
      type: "failure";
    }
  | {
      type: "loading";
    };

export interface FavoriteButtonUIModel {
  cityName: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeatherCardUIModel {
  location: string;
  date: string;
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  weather: string;
  weatherIconImagePath: string;
  favoriteButton: FavoriteButtonUIModel;
}

export interface DailyForecastSectionUIModel {
  forecasts: Array<{
    date: string;
    weather: string;
    minTemp: number;
    maxTemp: number;
    weatherIconImagePath: string;
  }>;
}

export interface HourlyForecastSectionUIModel {
  forecasts: Array<{
    time: string;
    temperature: number;
    humidity: number;
    weather: string;
    weatherIconImagePath: string;
  }>;
  hourlyByDate: {
    [date: string]: Array<{
      time: string;
      temperature: number;
      humidity: number;
      weather: string;
      weatherIconImagePath: string;
    }>;
  };
}

export interface BackgroundImageUIModel {
  imagePath: string;
}
