import React from 'react';

export default function OptionList({ currentDrinkData, setSelectedDrink }) {
  const drinks = currentDrinkData;

  if (drinks && drinks.length > 1) {
    const liItems = drinks.map(({ strDrink, idDrink }) => (
      <li key={idDrink} className="option_item" data-id={idDrink}>
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
      <>
        <p>We found these options:</p>
        <ol id="list" onClick={handleClick} className="option_list">
          {liItems}
        </ol>
      </>
    );
  }

  return null;
}
