import React from 'react';

export default function ControlButtons({ value, setCurrentDrink, setSelectedDrink }) {
  const handleChange = ({ target: { value } }) => {
    setCurrentDrink(value);
    setSelectedDrink(null);
  };

  const handleClick = () => {
    setCurrentDrink(`random${Math.floor(Math.random() * 10000)}`);
  };

  return (
    <div className="talk-zone">
      <input
        id="searchInput"
        type="text"
        placeholder="Bro, what is ...?"
        value={/^random/.test(value) ? '' : value}
        onChange={handleChange}
      />
      <button type="button" onClick={handleClick}>
        Bro, give me anything that burns!!!
      </button>
    </div>
  );
}
