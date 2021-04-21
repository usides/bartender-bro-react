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
  getData(window.data.inputDrinkName)
    .then(data => {
      window.data.apiDrinks = data;
      document.getElementById('app-root').innerHTML = App();
    })
    .catch(err => alert(err));
}
window.renderApp = renderApp;
renderApp();

function getData(value) {
  return new Promise((res, rej) => {
    if (value === '' || !value.trim().length) {
      res(null);
    }
    const req = fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`);
    const data = req.then(res => res.json());
    res(data);
  });
}

function setCurrentDrink({ target }) {
  const li = target.closest('li');
  if (!li) return;
  const drink = window.data.apiDrinks.drinks.find(elem => elem.idDrink === li.dataset.id);
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
        onchange="window.data.inputDrinkName = this.value; renderApp();"
      />
      <button
        class="talk-zone__request-random"
        type="button"
        >Bro, give me anything that burns!!!</button>
    </div>    
  `;
}

function optionList(setCurrentDrinkCB) {
  let template = '';
  if (window.data.apiDrinks && window.data.apiDrinks.drinks) {
    const { drinks } = window.data.apiDrinks;
    template = drinks
      .map(({ strDrink, idDrink }) => `<li data-id=${idDrink}>${strDrink}</li>`)
      .join('');
  }

  return `
    <ol id="list" class="chalk-brd__list" onclick="(${setCurrentDrinkCB})(event); renderApp();">
      ${template}
    </ol>   
  `;
}

function resultFields() {
  let template = '';
  const drink = window.data.currentDrink;
  if (drink) {
    const ingredList = [];
    const ingredMeasures = [];
    for (let i = 1; i <= 15; i++) {
      const ingrNo = `strIngredient${i}`;
      const measureNo = `strMeasure${i}`;
      if (drink[ingrNo]) {
        ingredList.push(drink[ingrNo]);
        ingredMeasures.push(drink[measureNo] ? drink[measureNo] : 'by eye');
      }
    }
    template = `
  <h1 class="drink-descript__header">${drink.strDrink}</h1>
  <img
    class="drink-descript__img"
    src="${drink.strDrinkThumb}/preview"
    alt="drink-img"
  />
  <div class="ingredients">
  <ul class="ingredients__list-name">
    ${ingredList.map(elem => `<li class="ingredients__item">${elem}</li>`).join('')}
    
  </ul>
  <ul class="ingredients__list-qty">
    ${ingredMeasures.map(elem => `<li class="ingredients__item">${elem}</li>`).join('')}
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
