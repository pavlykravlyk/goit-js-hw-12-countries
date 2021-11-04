import './sass/main.scss';
import debounce from 'lodash.debounce';
import myNotification from './js/notice-pnotify';
import countriesListTpl from './templates/countries-list-template.hbs';
import countryCardTpl from './templates/country-template.hbs';
import API from './js/fetchCountries.js';
import getRefs from './js/get-refs.js';

const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

async function onSearch(event) {
  const countryName = event.target.value;

  if (countryName !== '') {
    try {
      const response = await API.fetchCountries(countryName);
      return renderCountryCard(response);
    } catch {
      error => console.log(error);
    }
  }
  refs.countriesList.innerHTML = '';
  refs.countryCard.innerHTML = '';
}

function renderCountryCard(country) {
  if (country.length === 1) {
    refs.countryCard.innerHTML = countryCardTpl(country);
    refs.countriesList.innerHTML = '';
  } else if (country.length > 1 && country.length < 11) {
    refs.countriesList.innerHTML = countriesListTpl(country);
    refs.countryCard.innerHTML = '';
  } else if (country.length > 10) {
    myNotification();
  }
}
