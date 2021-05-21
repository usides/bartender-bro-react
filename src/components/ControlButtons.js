/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { makeSearch, showRandomDrink } from '../data/cocktailData';

export default function ControlButtons() {
  return (
    <div className="talk-zone">
      <input
        id="searchInput"
        type="text"
        placeholder="Bro, what is ...?"
        value={window.data.currentDrinkRequest === 'random' ? '' : window.data.currentDrinkRequest}
        onChange={e => makeSearch(e.target.value)}
        onFocus={e => e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
      />
      <button type="button" onClick={showRandomDrink}>
        Bro, give me anything that burns!!!
      </button>
    </div>
  );
}
