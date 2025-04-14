export interface FavoriteCity {
  name: string;
  latitude: number;
  longitude: number;
}

export interface FavoriteCities {
  cities: FavoriteCity[];
}

const FAVORITE_CITIES_KEY = 'favoriteCities';

export const getFavoriteCities = (): FavoriteCities => {
  
  const stored = localStorage.getItem(FAVORITE_CITIES_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return { cities: [] };
};

export const addFavoriteCity = (city: FavoriteCity): void => {
  const favorites = getFavoriteCities();
  // Deduplicate cities by name
  if (!favorites.cities.some(c => c.name === city.name)) {
    favorites.cities.push(city);
    localStorage.setItem(FAVORITE_CITIES_KEY, JSON.stringify(favorites));
  }
};

export const removeFavoriteCity = (cityName: string): void => {
  const favorites = getFavoriteCities();
  favorites.cities = favorites.cities.filter(city => city.name !== cityName);
  localStorage.setItem(FAVORITE_CITIES_KEY, JSON.stringify(favorites));
};

export const isCityFavorite = (cityName: string): boolean => {
  const favorites = getFavoriteCities();
  return favorites.cities.some(city => city.name === cityName);
}; 