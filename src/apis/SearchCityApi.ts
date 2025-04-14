import axios from 'axios';
import { SearchCityResponse, SearchCityItem } from '../responses/SearchCityResponse';

const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/search';

export const getCity = async (query: string): Promise<SearchCityResponse> => {
  try {
    const response = await axios.get(NOMINATIM_API_URL, {
      params: {
        q: query,
        format: 'json',
        limit: 10,
        featuretype: 'settlement'
      },
      headers: {
        'Accept-Language': 'en'
      }
    });

    const items: SearchCityItem[] = response.data.map((item: any): SearchCityItem => ({
      name: item.display_name,
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon)
    }));

    return { items };
  } catch (error) {
    console.error('Error fetching city data:', error);
    throw error;
  }
}; 