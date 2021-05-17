/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

let Component, Target;

export default function renderApp(componentFunction = null, targetElement = null) {
  if (componentFunction) Component = componentFunction;
  if (targetElement) Target = targetElement;
  Target.innerHTML = '';
  Target.appendChild(<Component />);
  document.getElementById('searchInput').focus();
}
