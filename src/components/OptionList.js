/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { setCurrentDrink } from '../data/cocktailData';

import styles from '../../main.css';
import { getLoadedDataByRequest } from '../data/cocktailData';

export default function OptionList() {
  const drinks = getLoadedDataByRequest();
  let content = '';

  if (drinks === null) content = <p>Nothing found</p>;

  if (drinks && drinks.length > 1) {
    const liItems = drinks.map(({ strDrink, idDrink }) => (
      <li class={styles.option_item} data-id={idDrink}>
        {strDrink}
      </li>
    ));

    content = (
      <>
        <p>I found these options:</p>
        <ol id="list" onClick={setCurrentDrink} class={styles.option_list}>
          {liItems}
        </ol>
      </>
    );
  }

  if (drinks && window.data.currentDrink === null) window.data.currentDrink = drinks[0];

  return content;
}
