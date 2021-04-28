import styles from './main.css';
// import { debounce } from './helpers';

if (module.hot) {
  module.hot.accept();
}

window.data = {
  currentDrinkRequest: '',
  loadedDrinkRequests: {},
  currentDrink: null,
  error: null,
  isDataLoading: false,
};

window.renderApp = renderApp;
window.makeSearch = makeSearch;
window.getLoadedDataByRequest = getLoadedDataByRequest;
window.showRandomDrink = showRandomDrink;

function renderApp() {
  document.getElementById('app-root').innerHTML = App();
  if (document.getElementById('list'))
    document.getElementById('list').addEventListener('click', setCurrentDrink);
  document.getElementById('searchInput').focus();
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

function showRandomDrink() {
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
      window.renderApp();
    });
}

function makeSearch(input) {
  input = input.toLowerCase().trim();
  window.data.currentDrinkRequest = input;
  window.data.error = null;
  window.data.isDataLoading = true;
  window.data.currentDrink = null;

  window.renderApp();

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
      window.renderApp();
    });
}

function isCurrentDrinkRequestLoaded() {
  if (getLoadedDataByRequest() || getLoadedDataByRequest() === null) {
    return true;
  } else {
    return false;
  }
}

function getLoadedDataByRequest() {
  const { currentDrinkRequest, loadedDrinkRequests } = window.data;
  return loadedDrinkRequests[currentDrinkRequest];
}

function setCurrentDrink({ target }) {
  const drinks = window.getLoadedDataByRequest();
  const li = target.closest('li');
  if (!li) return;
  const drink = drinks.find(elem => elem.idDrink === li.dataset.id);
  window.data.currentDrink = drink;
  window.renderApp();
}

function App() {
  return `
  ${ControlBtns()}
  ${Results()}
  `;
}

function Results() {
  let content = '';

  if (window.data.isDataLoading) return (content = `<p>Data is loading...</p>`);

  if (window.data.error) return (content = `<p>${window.data.error}</p>`);

  // if (window.data.currentDrinkRequest === '')
  //   return (content = `<p>Please type drink name or press the button</p>`);

  content = `<div>
     ${optionList()}
     ${resultFields()}
  </div>`;

  return content;
}

function ControlBtns() {
  return `
    <div class="talk-zone">
      <input
        id="searchInput"
        class="talk-zone__request"
        type="text"
        placeholder="Bro, what is ...?"
        value="${
          window.data.currentDrinkRequest === 'random' ? '' : window.data.currentDrinkRequest
        }"
        onchange="makeSearch(this.value)"
        onfocus="this.setSelectionRange(this.value.length,this.value.length)"
         />
      <button
        class="talk-zone__request-random"
        type="button"
        onclick="showRandomDrink();"
        >Bro, give me anything that burns!!!</button>
    </div>    
  `;
}

function optionList() {
  const drinks = window.getLoadedDataByRequest();
  let content = '';

  if (drinks === null) content = '<p>Nothing found</p>';

  if (drinks && drinks.length > 1) {
    const liItems = drinks
      .map(({ strDrink, idDrink }) => `<li data-id=${idDrink}>${strDrink}</li>`)
      .join('');

    content = `
      <ol id="list" class="chalk-brd__list" >
        ${liItems}
      </ol>     `;
    //onclick="(${setCurrentDrink})(event)"
  }

  if (drinks && window.data.currentDrink === null) window.data.currentDrink = drinks[0];

  return content;
}

function resultFields() {
  let template = '';
  const drink = window.data.currentDrink;

  if (drink) {
    const keys = Object.keys(drink);
    const ingredients = keys
      .filter(key => /strIngredient/.test(key))
      .map(key => drink[key])
      .filter(elem => elem);
    const measures = keys
      .filter(key => /strMeasure/.test(key))
      .map(key => drink[key])
      .slice(0, ingredients.length)
      .map(elem => (elem === null ? 'by eye' : elem));

    template = `
  <h1 class="drink-descript__header">${drink.strDrink}</h1>
  <img
    class="drink-descript__img"
    src="${drink.strDrinkThumb}/preview"
    alt="drink-img"
  />
  <div class="${styles.ingredients}">
  <ul class="${styles.ingredients__list_name}">
    ${ingredients.map(elem => `<li class="${styles.ingredients__item}">${elem}</li>`).join('')}
    
  </ul>
  <ul class="${styles.ingredients__list_qty}">
    ${measures.map(elem => `<li class="${styles.ingredients__item}">${elem}</li>`).join('')}
  </ul>
  
</div>
<p class="drink-descript__receipt">${drink.strInstructions}</p>
  `;
  }

  return `
  <div class="drink-descript__wrapper">
    ${template}
  </div>  
  `;
}

renderApp();
