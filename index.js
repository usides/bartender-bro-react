// import styles from './main.css';
// import { debounce } from './helpers';
// import { respondFromApi } from './respond';

if (module.hot) {
  module.hot.accept();
}

window.data = {
  inputDrinkName: '',
  apiDrinks: null,
  currentDrink: null,
};

function renderApp() {
  document.getElementById('app-root').innerHTML = App();
  document.getElementById('list').addEventListener('click', function (evt) {
    setCurrentDrink(evt);
    renderApp();
  });
}
window.renderApp = renderApp;
renderApp();

function fetchAndRender(value) {
  getData(value)
    .then(data => {
      window.data.apiDrinks = data;
      if (data) window.data.currentDrink = window.data.apiDrinks[0];
      renderApp();
    })
    .catch(err => alert(err));
}
window.fetchAndRender = fetchAndRender;

function getData(value) {
  return new Promise((res, rej) => {
    let url = '';
    if (value === undefined) {
      url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    } else {
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`;
      if (value === '' || !value.trim().length) {
        res(null);
      }
    }

    const req = fetch(url);
    const data = req.then(res => res.json()).then(res => res.drinks);
    res(data);
  });
}

function setCurrentDrink({ target }) {
  const li = target.closest('li');
  if (!li) return;
  const drink = window.data.apiDrinks.find(elem => elem.idDrink === li.dataset.id);
  window.data.currentDrink = drink;
}

function App() {
  return `
  ${controlBtns()}
  ${optionList(setCurrentDrink)}
  ${resultFields()}
  `;
}

function controlBtns() {
  return `
    <div class="talk-zone">
      <input
        class="talk-zone__request"
        type="text"
        placeholder="Bro, what is ...?"
        value="${window.data.inputDrinkName}"
        onchange="window.data.inputDrinkName = this.value; fetchAndRender(this.value)"
      />
      <button
        class="talk-zone__request-random"
        type="button"
        onclick="fetchAndRender(); window.data.inputDrinkName=''"
        >Bro, give me anything that burns!!!</button>
    </div>    
  `;
}

function optionList(setCurrentDrinkCB) {
  let template = '';
  const drinks = window.data.apiDrinks;

  if (drinks && drinks.length > 1) {
    template = drinks
      .map(({ strDrink, idDrink }) => `<li data-id=${idDrink}>${strDrink}</li>`)
      .join('');
  }

  return `
    <ol id="list" class="chalk-brd__list">
      ${template}
    </ol>   
  `;
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
  <div class="ingredients">
  <ul class="ingredients__list-name">
    ${ingredients.map(elem => `<li class="ingredients__item">${elem}</li>`).join('')}
    
  </ul>
  <ul class="ingredients__list-qty">
    ${measures.map(elem => `<li class="ingredients__item">${elem}</li>`).join('')}
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
