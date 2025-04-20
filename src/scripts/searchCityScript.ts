import { getCity } from '../apis/SearchCityApi';

export const initializeSearchCity = () => {
  const input = document.getElementById('citySearch') as HTMLInputElement;
  const results = document.getElementById('searchResults');

  if (!input || !results) return;

  let timeoutId: ReturnType<typeof setTimeout>;

  input.addEventListener('input', async (e) => {
    const target = e.target as HTMLInputElement;
    const query = target.value;

    // Debounce the input
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      if (query.length < 2) {
        results.classList.add('hidden');
        return;
      }

      try {
        const response = await getCity(query);
        results.innerHTML = '';
        results.classList.remove('hidden');

        response.items.forEach((item) => {
          const div = document.createElement('div');
          div.className = 'p-2 hover:bg-gray-100 hover:text-black cursor-pointer';
          div.textContent = item.name;
          
          div.addEventListener('click', () => {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('lat', item.latitude.toString());
            newUrl.searchParams.set('lon', item.longitude.toString());
            newUrl.searchParams.set('city', encodeURIComponent(item.name));
            window.location.replace(newUrl.toString());
          });
          
          results.appendChild(div);
        });
      } catch (error) {
        console.error('Search error:', error);
        results.classList.add('hidden');
      }
    }, 300);
  });

  // When clicking outside the input field, hide the results
  document.addEventListener('click', (e) => {
    const target = e.target as Node;
    if (!input.contains(target) && !results.contains(target)) {
      results.classList.add('hidden');
    }
  });
}; 