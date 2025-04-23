import { getFavoriteCities, FavoriteCity } from "../utils/LocalStorageUtils";

export function initializeFavoriteCitiesDropdown() {
  const button = document.getElementById("favoriteDropdownButton");
  const dropdown = document.getElementById("favoriteDropdown");
  const citiesList = document.getElementById("favoriteCitiesList");
  const noFavoritesMessage = document.getElementById("noFavoritesMessage");

  function updateFavoriteCities() {
    if (!citiesList || !noFavoritesMessage) return;

    const favorites = getFavoriteCities();

    if (favorites.cities.length > 0) {
      citiesList.innerHTML = favorites.cities
        .map(
          (city: FavoriteCity) => `
        <a
          href="?lat=${city.latitude}&lon=${
            city.longitude
          }&city=${encodeURIComponent(city.name)}"
          class="block p-2 hover:bg-gray-100 hover:text-black"
        >
          ${city.name}
        </a>
      `
        )
        .join("");
      citiesList.classList.remove("hidden");
      noFavoritesMessage.classList.add("hidden");
    } else {
      citiesList.classList.add("hidden");
      noFavoritesMessage.classList.remove("hidden");
    }
  }

  if (button && dropdown && citiesList && noFavoritesMessage) {
    updateFavoriteCities();

    button.addEventListener("click", () => {
      dropdown.classList.toggle("invisible");
      dropdown.classList.toggle("opacity-0");
      dropdown.classList.toggle("opacity-100");
    });

    document.addEventListener("click", (e) => {
      const target = e.target as Node;
      if (!button.contains(target) && !dropdown.contains(target)) {
        dropdown.classList.add("invisible");
        dropdown.classList.remove("opacity-100");
        dropdown.classList.add("opacity-0");
      }
    });
  }
  window.addEventListener("favoritesUpdated", () => {
    updateFavoriteCities();
  });
}
