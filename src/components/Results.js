import OptionList from './OptionList';
import ResultFields from './ResultFields';

export default function Results() {
  let content = '';

  if (window.data.isDataLoading) return (content = `<p>Data is loading...</p>`);

  if (window.data.error) return (content = `<p>${window.data.error}</p>`);

  // if (window.data.currentDrinkRequest === '')
  //   return (content = `<p>Please type drink name or press the button</p>`);

  content = `<div>
     ${OptionList()}
     ${ResultFields()}
  </div>`;

  return content;
}
