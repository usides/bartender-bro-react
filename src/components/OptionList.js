import React from 'react';
import { useAppContext } from '../context';

export default function OptionList({ setSelectedDrink }) {
  const { currentDrinkData: drinks } = useAppContext();

  if (drinks && drinks.length > 1) {
    const liItems = drinks.map(({ strDrink, idDrink }) => (
      <li key={idDrink} className="option-list__item" data-id={idDrink}>
        {strDrink}
      </li>
    ));

    const handleClick = ({ target }) => {
      const li = target.closest('li');
      if (!li) return;
      const drink = drinks.find(elem => elem.idDrink === li.dataset.id);
      setSelectedDrink(drink);
    };

    return (
      <div className="option-list">
        <p className="option-list__info">We found these options:</p>
        <ol className="option-list__list" onClick={handleClick}>
          {liItems}
        </ol>
      </div>
    );
  }

  return null;
}
