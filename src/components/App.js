import React, { useState, useEffect } from 'react';
import { loadDrinkData } from '../data/cocktailData';
import { AppContext } from '../context';
import ControlButtons from './ControlButtons';
import Results from './Results';

export default function App() {
  const [currentDrink, setCurrentDrink] = useState('');
  const [currentDrinkData, setCurrentDrinkData] = useState([]);
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

  return (
    <>
      <ControlButtons setCurrentDrink={setCurrentDrink} currentDrink={currentDrink} />
      <AppContext.Provider value={currentDrinkData}>
        <Results error={error} currentDrink={currentDrink} />
      </AppContext.Provider>
    </>
  );
}
