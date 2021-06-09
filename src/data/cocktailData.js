const dataStorage = {};

export function loadDrinkData(currentDrink) {
  const currentDrinkData = dataStorage[currentDrink];

  if (currentDrinkData) return currentDrinkData;

  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${currentDrink}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw Error(response.status);
    }
    const result = response.json();
    dataStorage[currentDrink] = result;
    return result;
  });
}

export function setCurrentDrink({ target }) {
  const drinks = getLoadedDataByRequest();
  const li = target.closest('li');
  if (!li) return;
  const drink = drinks.find(elem => elem.idDrink === li.dataset.id);
  window.data.currentDrink = drink;
  renderApp();
}

export function getLoadedDataByRequest() {
  const { currentDrinkRequest, loadedDrinkRequests } = window.data;
  return loadedDrinkRequests[currentDrinkRequest];
}

function isCurrentDrinkRequestLoaded() {
  if (getLoadedDataByRequest() || getLoadedDataByRequest() === null) {
    return true;
  } else {
    return false;
  }
}

function getData(input) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`;
  if (input === '') {
    const error = 'Please input correct data';
    return Promise.resolve({ error });
  }

  if (!isCurrentDrinkRequestLoaded()) {
    return fetch(url)
      .then(res => res.json())
      .then(data => data.drinks)
      .then(data => ({ data }));
  }

  return Promise.resolve({});
}

export function showRandomDrink() {
  window.data.currentDrink = null;
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const request = fetch(url)
    .then(res => res.json())
    .then(data => data.drinks);
  request
    .then(data => {
      window.data.loadedDrinkRequests.random = data;
      window.data.currentDrinkRequest = 'random';
    })
    .catch(err => (window.data.error = err))
    .finally(() => {
      renderApp();
    });
}

export function makeSearch(input) {
  input = input.toLowerCase().trim();
  window.data.currentDrinkRequest = input;
  window.data.error = null;
  window.data.isDataLoading = true;
  window.data.currentDrink = null;

  renderApp();

  getData(input)
    .then(({ data, error }) => {
      window.data.isDataLoading = false;

      if (error) {
        window.data.error = error;
      } else if (data || data === null) {
        window.data.loadedDrinkRequests[input] = data;
      }
    })
    .catch(err => (window.data.error = err))
    .finally(() => {
      renderApp();
    });
}
