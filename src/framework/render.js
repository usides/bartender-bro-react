import { setCurrentDrink } from '../data/cocktailData';

let Component, Target;

export default function renderApp(componentFunction, targetElementId) {
  if (componentFunction) Component = componentFunction;
  if (targetElementId) Target = targetElementId;
  document.getElementById(Target).innerHTML = Component();
  if (document.getElementById('list'))
    document.getElementById('list').addEventListener('click', setCurrentDrink);
  document.getElementById('searchInput').focus();
}
