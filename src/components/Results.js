import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context';
import OptionList from './OptionList';
import ResultFields from './ResultFields';

export default function Results({ error, currentDrink }) {
  const drinks = useAppContext();

  const [selectedDrink, setSelectedDrink] = useState(null);

  useEffect(() => {
    if (drinks && drinks.length !== 0) {
      setSelectedDrink(drinks[0]);
    }
  }, [drinks]);

  if (error) return <p>{`Ops! ${error}`}</p>;

  if (currentDrink === '') return <p>Please type drink name or press the button</p>;

  if (drinks === null) return <p>Nothing found</p>;

  return (
    <div>
      <OptionList setSelectedDrink={setSelectedDrink} />
      <ResultFields selectedDrink={selectedDrink} />
    </div>
  );
}
