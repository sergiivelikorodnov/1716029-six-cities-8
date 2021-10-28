import { useState } from 'react';
import { SortingType } from '../../consts';

type Sorting = {
  selectedSortTypeHandler:(sortType:string) => void;
  selectedSortType: string;
}

function MainSortingList({selectedSortType, selectedSortTypeHandler}: Sorting): JSX.Element{
  const [isSortOpening, setIsSortOpening] = useState(false);

  const sortOpenHandler = () => {
    setIsSortOpening(!isSortOpening);
  };

  const setSortTypeHandler = (sortType:string) => {
    setIsSortOpening(!isSortOpening);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span onClick={sortOpenHandler} className="places__sorting-type" tabIndex={0}>
        {selectedSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom places__options${isSortOpening ? '--opened' : ''}`}>
        {Object.values(SortingType).map((value)=>
          <li key={value} onClick={() => { selectedSortTypeHandler(value); setSortTypeHandler(value);}} className={`places__option ${selectedSortType=== value?'places__option--active' : ''}`} tabIndex={0}>{ value }</li>,
        )}
      </ul>
    </form>
  );
}

export default MainSortingList;
