import App from '../components/App';
import { setCurrentDrink } from '../data/cocktailData';

export default function renderApp() {
  document.getElementById('app-root').innerHTML = App();
  if (document.getElementById('list'))
    document.getElementById('list').addEventListener('click', setCurrentDrink);
  document.getElementById('searchInput').focus();
}
