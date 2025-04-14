import { getCurrentLocation } from '../apis/LocationApi';

// Execute immediately when the script is loaded
(async () => {
  console.log("Client side execution");
  console.log("Current URL:", window.location.href);
  console.log("URL parameters:", window.location.search);
  
  // If there are no URL parameters, get location
  if (!window.location.search) {
    console.log("No URL parameters, getting location");
    const location = await getCurrentLocation();
    console.log("Location found, updating URL");
    // Create new URL
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('lat', location.latitude.toString());
    newUrl.searchParams.set('lon', location.longitude.toString());
    newUrl.searchParams.set('city', encodeURIComponent(location.city));
    console.log("New URL:", newUrl.toString());
    // Reload the page with the new URL
    window.location.replace(newUrl.toString());
  }
})(); 