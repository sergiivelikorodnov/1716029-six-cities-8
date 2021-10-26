import { useState } from 'react';
import { SortingType } from '../../consts';


function MainSortingList(): JSX.Element{
  const [isSortOpening, setIsSortOpening] = useState(false);
  const [selectedSortType, setSelectedSortType] = useState(SortingType.POPULAR);

  const sortOpenHandler = () => {
    setIsSortOpening(!isSortOpening);
  };

  const selectedSortTypeHandler = () => {
    setIsSortOpening(!isSortOpening);
    setSelectedSortType(SortingType.PRICE_DOWN);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span onClick={sortOpenHandler} className="places__sorting-type" tabIndex={0}>
        {selectedSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom places__options${isSortOpening ? '--opened' : ''}`}>
        <li className="places__option" tabIndex={0}>{ SortingType.POPULAR }</li>
        <li className="places__option" tabIndex={0}>{ SortingType.PRICE_UP }</li>
        <li onClick={selectedSortTypeHandler} className="places__option" tabIndex={0}>{ SortingType.PRICE_DOWN }</li>
        <li className="places__option" tabIndex={0}>{ SortingType.TOP_RATED }</li>
      </ul>
    </form>
  );
}

export default MainSortingList;
