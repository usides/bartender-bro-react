/** @jsx createElement */
/** @jsxFrag createFragment */

import styles from '../../main.css';

import { createElement, createFragment } from '../framework';

export default function OptionList({ currentDrinkData, setSelectedDrink }) {
  const drinks = currentDrinkData;

  if (drinks && drinks.length > 1) {
    const liItems = drinks.map(({ strDrink, idDrink }) => (
      <li class={styles.option_item} data-id={idDrink}>
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
        <ol id="list" onClick={handleClick} class={styles.option_list}>
          {liItems}
        </ol>
      </>
    );
  }
}
