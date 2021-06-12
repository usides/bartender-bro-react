import React, { useState, useEffect } from 'react';
import { loadDrinkData, loadIngredientData } from '../data/cocktailData';
import { AppContext } from '../context';
import ControlButtons from './ControlButtons';
import Results from './Results';
import IngredientInfo from './IngredientInfo';

export default function App() {
  const [currentDrink, setCurrentDrink] = useState('');
  const [currentDrinkData, setCurrentDrinkData] = useState([]);
  const [error, setError] = useState(null);
  const [ingredient, setIngredient] = useState(null);
  const [ingredientData, setIngredientData] = useState(null);

  useEffect(() => {
    if (currentDrink) {
      loadDrinkData(currentDrink)
        .then(data => {
          const { drinks } = data;
          setError(null);
          setCurrentDrinkData(drinks);
        })
        .catch(err => setError(err));

      setIngredient(null);
    }
  }, [currentDrink]);

  useEffect(() => {
    if (ingredient) {
      loadIngredientData(ingredient)
        .then(data => {
          const { ingredients } = data;
          setError(null);
          setIngredientData(ingredients[0]);
        })
        .catch(err => setError(err));
    }
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
