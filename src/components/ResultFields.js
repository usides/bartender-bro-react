import React from 'react';

export default function ResultFields({ selectedDrink }) {
  const drink = selectedDrink;

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

    return (
      <div>
        <h1>{drink.strDrink}</h1>
        <img src={`${drink.strDrinkThumb}/preview`} alt="drink-img" />
        <div className="ingredients">
          <ul className="ingredients__list_name">
            {ingredients.map((elem, index) => (
              <li key={index} className="ingredients__item">
                {elem}
              </li>
            ))}
          </ul>
          <ul className="ingredients__list_qty">
            {measures.map((elem, index) => (
              <li key={index} className="ingredients__item">
                {elem}
              </li>
            ))}
          </ul>
        </div>
        <p>{drink.strInstructions}</p>
      </div>
    );
  }

  return null;
}
