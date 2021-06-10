const dataStorage = {};

export function loadDrinkData(currentDrink) {
  let url;
  const currentDrinkData = dataStorage[currentDrink];
  if (currentDrinkData) return currentDrinkData;

  if (/^random/.test(currentDrink)) {
    url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  } else {
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${currentDrink}`;
  }

  return fetch(url).then(response => {
    if (!response.ok) {
      throw Error(response.status);
    }
    const result = response.json();
    if (!/^random/.test(currentDrink)) {
      dataStorage[currentDrink] = result;
    }

    return result;
  });
}
