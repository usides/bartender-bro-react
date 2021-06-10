/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState, useEffect } from '../framework';
import { loadDrinkData, loadRandomData } from '../data/cocktailData';

import ControlButtons from './ControlButtons';
import Results from './Results';

export default function App() {
  const [currentDrink, setCurrentDrink] = useState('');
  const [currentDrinkData, setCurrentDrinkData] = useState('');
  const [error, setError] = useState(null);
  const [selectedDrink, setSelectedDrink] = useState(null);

  useEffect(() => {
    if (currentDrink) {
      loadDrinkData(currentDrink)
        .then(data => {
          const { drinks } = data;
          setError(null);
          setCurrentDrinkData(drinks);
        })
        .catch(err => setError(err));
    }
  }, [currentDrink]);

  useEffect(() => {
    if (currentDrinkData) {
      setSelectedDrink(currentDrinkData[0]);
    }
  }, [currentDrinkData]);

  return (
    <>
      <ControlButtons
        setCurrentDrink={setCurrentDrink}
        value={currentDrink}
        setSelectedDrink={setSelectedDrink}
        setCurrentDrinkData={setCurrentDrinkData}
      />
      <Results
        error={error}
        currentDrinkData={currentDrinkData}
        currentDrink={currentDrink}
        selectedDrink={selectedDrink}
        setSelectedDrink={setSelectedDrink}
      />
    </>
  );
}
