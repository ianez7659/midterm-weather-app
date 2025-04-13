import { LocationResponse } from '../responses/LocationResponse';

export const DEFAULT_CITY = 'Tokyo';
export const DEFAULT_COORDS = {
  latitude: 35.681236,
  longitude: 139.767125
};

export const getCurrentLocation = async (): Promise<LocationResponse> => {
  return new Promise((resolve) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
              {
                headers: {
                  'Accept-Language': 'en'
                }
              }
            );
            const data = await response.json();
            const city = data.address.city || data.address.town || data.address.village;
            const result: LocationResponse = { latitude, longitude, city };
            resolve(result);
          } catch (error) {
            console.error('Failed to reverse geocode:', error);
            resolve({ ...DEFAULT_COORDS, city: DEFAULT_CITY });
          }
        },
        (error) => {
          console.log('Failed to get location:', error.message);
          resolve({ ...DEFAULT_COORDS, city: DEFAULT_CITY });
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      console.error('This browser does not support the Geolocation API');
      resolve({ ...DEFAULT_COORDS, city: DEFAULT_CITY });
    }
  });
}; 