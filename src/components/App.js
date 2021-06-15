import React, { useState, useEffect } from 'react';
import { loadDrinkData, loadIngredientData } from '../data/cocktailData';
import { AppContext } from '../context';
import ControlButtons from './ControlButtons';
import Results from './Results';
import IngredientInfo from './IngredientInfo';

const DEBOUNCE_SEARCH_TIMEOUT = 200;

export default function App() {
  const [currentDrink, setCurrentDrink] = useState('');
  const [currentDrinkData, setCurrentDrinkData] = useState([]);
  const [error, setError] = useState(null);
  const [ingredient, setIngredient] = useState(null);
  const [ingredientData, setIngredientData] = useState({});

  useEffect(() => {
    if (!currentDrink) return;
    const debounceTimerId = setTimeout(() => {
      loadDrinkData(currentDrink)
        .then(({ drinks }) => {
          setError(null);
          setCurrentDrinkData(drinks);
        })
        .catch(err => setError(err));

      setIngredient(null);
    }, DEBOUNCE_SEARCH_TIMEOUT);
    return () => clearTimeout(debounceTimerId);
  }, [currentDrink]);

  useEffect(() => {
    if (!ingredient) return;
    loadIngredientData(ingredient)
      .then(({ ingredients: [ingredients] }) => {
        setError(null);
        setIngredientData(ingredients);
      })
      .catch(err => setError(err));
  }, [ingredient]);

  return (
    <div className="app">
      <h1 className="app__heading">BartenderBro</h1>
      <AppContext.Provider value={{ currentDrinkData, currentDrink, setIngredient }}>
        <ControlButtons setCurrentDrink={setCurrentDrink} />
        <Results error={error} />
        {ingredient && <IngredientInfo ingredient={ingredient} ingredientData={ingredientData} />}
      </AppContext.Provider>
    </div>
  );
}
