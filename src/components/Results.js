/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import OptionList from './OptionList';
import ResultFields from './ResultFields';

export default function Results({ error, currentDrinkData, currentDrink }) {
  if (error) return <p>{`Ops! ${error}`}</p>;

  if (currentDrink === '') return <p>Please type drink name or press the button</p>;

  return (
    <div>
      <p>{currentDrinkData}</p>
      {/* <OptionList />
      <ResultFields /> */}
    </div>
  );
}
