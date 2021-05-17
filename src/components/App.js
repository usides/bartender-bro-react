/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import ControlButtons from './ControlButtons';
import Results from './Results';

export default function App() {
  return (
    <>
      <ControlButtons />
      <Results />
    </>
  );
}
