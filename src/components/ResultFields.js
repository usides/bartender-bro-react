import styles from '../../main.css';

export default function ResultFields() {
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
