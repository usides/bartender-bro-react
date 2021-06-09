/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../framework';
// import { makeSearch, showRandomDrink } from '../data/cocktailData';

export default function ControlButtons({ value, handleChange }) {
  return (
    <div className="talk-zone">
      <input
        id="searchInput"
        type="text"
        placeholder="Bro, what is ...?"
        value={value === 'random' ? '' : value}
        onChange={handleChange}
        // onFocus={e => e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
      />
      <button type="button">Bro, give me anything that burns!!!</button>
    </div>
  );
}
