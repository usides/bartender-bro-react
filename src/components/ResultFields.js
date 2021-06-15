import React from 'react';
import { useAppContext } from '../context';

function isIngredient(key) {
  return /strIngredient/.test(key);
}

function isMeasure(key) {
  return /strMeasure/.test(key);
}

export default function ResultFields({ selectedDrink: drink }) {
  const { setIngredient } = useAppContext();

  if (!drink) return null;

  const keys = Object.keys(drink);
  const ingredients = keys
    .filter(isIngredient)
    .map(key => drink[key])
    .filter(elem => elem);
  const measures = keys
    .filter(isMeasure)
    .map(key => drink[key])
    .slice(0, ingredients.length)
    .map(elem => elem || 'by eye');

  const handleClick = ({ target }) => {
    const li = target.closest('li');
    if (!li) return;
    setIngredient(li.textContent);
  };

  return (
    <div className="result-fields">
      <p className="result-fields__name">{drink.strDrink}</p>
      <img
        className="result-fields__image"
        src={`${drink.strDrinkThumb}/preview`}
        alt="drink-img"
      />
      <div className="ingredients">
        <ul onClick={handleClick} className="ingredients__list-name">
          {ingredients.map((elem, index) => (
            <li key={index} className={`ingredients__item ingredients__item__selectable`}>
              {elem}
            </li>
          ))}
        </ul>
        <ul className="ingredients__list-qty">
          {measures.map((elem, index) => (
            <li key={index} className="ingredients__item">
              {elem}
            </li>
          ))}
        </ul>
      </div>
      <p className="result-fields__instruction">{drink.strInstructions}</p>
    </div>
  );
}
