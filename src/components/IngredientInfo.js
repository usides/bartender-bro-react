import React, { useState, useEffect } from 'react';

export default function IngredientInfo({ ingredient, ingredientData }) {
  if (ingredientData) {
    const ingData = ingredientData.strDescription;
    return (
      <div>
        <p>{ingredient}</p>
        <img
          src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`}
          alt="Ingredient Picture"
        />
        <p>{ingData ? ingData : 'No text description'}</p>
      </div>
    );
  }

  return null;
}
