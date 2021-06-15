import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context';
import OptionList from './OptionList';
import ResultFields from './ResultFields';

export default function Results({ error }) {
  const { currentDrinkData: drinks, currentDrink } = useAppContext();

  const [selectedDrink, setSelectedDrink] = useState(null);

  useEffect(() => {
    if (!drinks) return;
    setSelectedDrink(drinks[0]);
  }, [drinks]);

  if (error) return <p className="message">{`Ops! ${error}`}</p>;

  if (currentDrink === '')
    return <p className="message">Please type drink name or press the button</p>;

  if (drinks === null) return <p className="message">Nothing found</p>;

  return (
    <div className="results">
      <OptionList setSelectedDrink={setSelectedDrink} />
      <ResultFields selectedDrink={selectedDrink} />
    </div>
  );
}
