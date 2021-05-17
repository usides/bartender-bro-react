export default function ControlButtons() {
  return `
    <div class="talk-zone">
      <input
        id="searchInput"
        class="talk-zone__request"
        type="text"
        placeholder="Bro, what is ...?"
        value="${
          window.data.currentDrinkRequest === 'random' ? '' : window.data.currentDrinkRequest
        }"
        onchange="makeSearch(this.value)"
        onfocus="this.setSelectionRange(this.value.length,this.value.length)"
         />
      <button
        class="talk-zone__request-random"
        type="button"
        onclick="showRandomDrink();"
        >Bro, give me anything that burns!!!</button>
    </div>    
  `;
}
