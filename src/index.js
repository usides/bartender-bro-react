import renderApp from './framework/render';
import { makeSearch, getLoadedDataByRequest, showRandomDrink } from './data/cocktailData';
import data from './data/data';

import styles from '../main.css';
// import { debounce } from './helpers';

if (module.hot) {
  module.hot.accept();
}
window.data = data;

window.renderApp = renderApp;
window.makeSearch = makeSearch;
window.getLoadedDataByRequest = getLoadedDataByRequest;
window.showRandomDrink = showRandomDrink;

renderApp();
