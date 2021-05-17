import styles from '../../main.css';

export default function OptionList() {
  const drinks = window.getLoadedDataByRequest();
  let content = '';

  if (drinks === null) content = '<p>Nothing found</p>';

  if (drinks && drinks.length > 1) {
    const liItems = drinks
      .map(
        ({ strDrink, idDrink }) =>
          `<li class="${styles.option_item}" data-id=${idDrink}>${strDrink}</li>`,
      )
      .join('');

    content = `
      <p>I found these options:</p>
      <ol id="list" class="${styles.option_list}" >
        ${liItems}
      </ol>     `;
    //onclick="(${setCurrentDrink})(event)"
  }

  if (drinks && window.data.currentDrink === null) window.data.currentDrink = drinks[0];

  return content;
}
