export const DEFAULT_CITY = 'Vancouver';
export const DEFAULT_COORDS = {
  latitude: 49.2827,
  longitude: -123.1207
};

export const getCurrentLocation = async () => {
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
            resolve({ latitude, longitude, city });
          } catch (error) {
            console.error('Failed to reverse geocode:', error);
            resolve({ ...DEFAULT_COORDS, city: DEFAULT_CITY });
          }
        },
        (error) => {
          console.error('Failed to get location:', error.message);
          resolve({ ...DEFAULT_COORDS, city: DEFAULT_CITY });
        }
      );
    } else {
      console.error('This browser does not support the Geolocation API');
      resolve({ ...DEFAULT_COORDS, city: DEFAULT_CITY });
    }
  });
}; 