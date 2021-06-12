import React from 'react';
import { useAppContext } from '../context';

export default function ControlButtons({ setCurrentDrink }) {
  const { currentDrink } = useAppContext();

  const handleChange = ({ target: { value } }) => {
    setCurrentDrink(value);
  };

  const handleClick = () => {
    setCurrentDrink(`random${Math.floor(Math.random() * 10000)}`);
  };

  return (
    <div className="controls">
      <input
        className="controls__input"
        type="text"
        placeholder="Bro, what is ...?"
        value={/^random/.test(currentDrink) ? '' : currentDrink}
        onChange={handleChange}
        spellCheck="false"
      />
      <button className="controls__button" type="button" onClick={handleClick}>
        Bro, give me anything that burns!!!
      </button>
    </div>
  );
}
