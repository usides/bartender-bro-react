import React from 'react';

import OptionList from './OptionList';
import ResultFields from './ResultFields';

export default function Results({
  error,
  currentDrinkData,
  selectedDrink,
  setSelectedDrink,
  currentDrink,
}) {
  if (error) return <p>{`Ops! ${error}`}</p>;

  if (currentDrink === '') return <p>Please type drink name or press the button</p>;

  if (currentDrinkData === null) return <p>Nothing found</p>;

  return (
    <div>
      <OptionList currentDrinkData={currentDrinkData} setSelectedDrink={setSelectedDrink} />
      <ResultFields selectedDrink={selectedDrink} />
    </div>
  );
}
