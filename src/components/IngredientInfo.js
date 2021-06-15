import React from 'react';

export default function IngredientInfo({ ingredient, ingredientData }) {
  if (!ingredientData) return null;

  return (
    <div className="ingredient-info">
      <p className="ingredient-info__heading">Ingredient</p>
      <p className="ingredient-info__name">{ingredient}</p>
      <img
        className="ingredient-info__image"
        src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`}
        alt="Ingredient Picture"
      />
      <p className="ingredient-info__data">
        {ingredientData.strDescription || 'No text description'}
      </p>
    </div>
  );
}
