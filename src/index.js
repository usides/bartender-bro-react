import renderApp from './framework/render';
import data from './data/data';
import App from './components/App';

if (module.hot) {
  module.hot.accept();
}
window.data = data;

renderApp(App, document.getElementById('app-root'));
