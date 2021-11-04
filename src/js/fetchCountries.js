const BASE_URL = 'https://restcountries.com/v2';

async function fetchCountries(searchQuery) {
  const response = await fetch(`${BASE_URL}/name/${searchQuery}`);
  const result = await response.json();
  return result;
}

export default { fetchCountries };
