import { SortingType } from '../../consts';

function MainSortingItem ():JSX.Element{
  return (
    <ul className="places__options places__options--custom places__options--opened">
      <li className="places__option" tabIndex={0}>{ SortingType.POPULAR }</li>
      <li className="places__option" tabIndex={0}>{ SortingType.PRICE_UP }</li>
      <li className="places__option" tabIndex={0}>{ SortingType.PRICE_DOWN }</li>
      <li className="places__option" tabIndex={0}>{ SortingType.TOP_RATED }</li>
    </ul>
  );
}

export default MainSortingItem;
