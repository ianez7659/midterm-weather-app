import {
  addFavoriteCity,
  removeFavoriteCity,
  isCityFavorite,
} from "../utils/LocalStorageUtils";

export const initializeFavoriteButton = () => {
  const button = document.getElementById("favoriteButton");

  if (!button) return;

  const cityName = button.dataset.cityName as string;
  const latitude = parseFloat(button.dataset.latitude || "0");
  const longitude = parseFloat(button.dataset.longitude || "0");

  if (isCityFavorite(cityName)) {
    button.classList.add("text-yellow-500");
  } else {
    button.classList.remove("text-yellow-500");
  }

  button.addEventListener("click", () => {
    if (isCityFavorite(cityName)) {
      removeFavoriteCity(cityName);
      button.classList.remove("text-yellow-500");
    } else {
      addFavoriteCity({ name: cityName, latitude, longitude });
      button.classList.add("text-yellow-500");
    }

    window.dispatchEvent(new Event("favoritesUpdated"));
  });
};
