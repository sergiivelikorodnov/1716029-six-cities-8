import MainListOffers from '../main-list-offers/main-list-offers';
import MainMap from '../main-map/main-map';

import MainSortingList from '../main-sorting-list/main-sorting-list';
import { Offers } from '../../types/offer';

type CityContainer = {
  offersList: Offers;
  sortedOffers: Offers;
  selectedSortTypeHandler: (sortType: string) => void;
  selectedSortType: string;
};

function MainCityContainer({
  selectedSortType,
  selectedSortTypeHandler,
  sortedOffers,
  offersList,
}: CityContainer): JSX.Element {
  const propertyNumber: number = sortedOffers.length;
  const [{ city }] = sortedOffers;
  const [
    {
      city: { name },
    },
  ] = sortedOffers;

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {propertyNumber} {`${propertyNumber < 2 ? 'place' : 'places'}`} to
            stay in {name}
          </b>
          <MainSortingList
            selectedSortTypeHandler={selectedSortTypeHandler}
            selectedSortType={selectedSortType}
          />
          <MainListOffers
            offers={sortedOffers}
          />
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <MainMap
              offersList={offersList}
              city={city}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default MainCityContainer;
