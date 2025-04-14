export interface SearchCityItem {
  name: string;
  latitude: number;
  longitude: number;
}

export interface SearchCityResponse {
  items: SearchCityItem[];
} 