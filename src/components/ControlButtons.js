/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../framework';
// import { loadRandomData } from '../data/cocktailData';

export default function ControlButtons({
  value,
  setCurrentDrink,
  setSelectedDrink,
  setCurrentDrinkData,
}) {
  const handleChange = ({ target: { value } }) => {
    setCurrentDrink(value);
    setSelectedDrink(null);
    setCurrentDrinkData('');
  };

  const handleClick = () => {
    // loadRandomData().then(setCurrentDrinkData);
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
        onFocus={e => e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
      />
      <button type="button" onClick={handleClick}>
        Bro, give me anything that burns!!!
      </button>
    </div>
  );
}
