/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState, useEffect } from '../framework';
import { loadDrinkData } from '../data/cocktailData';

import ControlButtons from './ControlButtons';
import Results from './Results';

export default function App() {
  const [currentDrink, setCurrentDrink] = useState('');
  const [currentDrinkData, setCurrentDrinkData] = useState(null);
  const [error, setError] = useState(null);

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

  const handleChange = ({ target: { value } }) => setCurrentDrink(value);

  return (
    <>
      <ControlButtons handleChange={handleChange} value={currentDrink} />
      <Results error={error} currentDrinkData={currentDrinkData} currentDrink={currentDrink} />
    </>
  );
}
