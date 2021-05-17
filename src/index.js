import renderApp from './framework/render';
import { makeSearch, showRandomDrink } from './data/cocktailData';
import data from './data/data';
import App from './components/App';

import styles from '../main.css';
// import { debounce } from './helpers';

if (module.hot) {
  module.hot.accept();
}
window.data = data;

window.renderApp = renderApp;
window.makeSearch = makeSearch;
window.showRandomDrink = showRandomDrink;

renderApp(App, 'app-root');
