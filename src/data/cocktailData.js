import { isRandom } from '../utils';

const drinkStorage = {};
const ingredientStorage = {};

export function loadDrinkData(currentDrink) {
  let url;
  const currentDrinkData = drinkStorage[currentDrink];
  if (currentDrinkData) return currentDrinkData;

  if (isRandom(currentDrink)) {
    url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  } else {
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${currentDrink}`;
  }

  return fetch(url).then(response => {
    if (!response.ok) {
      throw Error(response.status);
    }
    const result = response.json();
    if (!isRandom(currentDrink)) {
      drinkStorage[currentDrink] = result;
    }

    return result;
  });
}

export function loadIngredientData(ingredient) {
  const ingredientData = ingredientStorage[ingredient];
  if (ingredientData) return ingredientData;

  const url = `https://thecocktaildb.com/api/json/v1/1/search.php?i=${ingredient}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw Error(response.status);
    }
    const result = response.json();
    ingredientStorage[ingredient] = result;
    return result;
  });
}
