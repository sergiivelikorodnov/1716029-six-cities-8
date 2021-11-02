import { Offers } from '../../types/offer';
import ListOffers from '../list-offers/list-offers';
import Map from '../map/map';

import MainLocationList from '../main-location-list/main-location-list';
import MainSortingList from '../main-sorting-list/main-sorting-list';
import { SortingType } from '../../consts';
import {
  getSortedOffersPriceDown,
  getSortedOffersPriceUp,
  getSortedOffersTopRated
} from '../../utils/utils';
import { useState } from 'react';
import Header from '../header/header';

type Property = {
  cities: string[];
  offersList: Offers;
};

function Main({ cities, offersList }: Property): JSX.Element {
  const [selectedSortType, setSelectedSortType] = useState(SortingType.POPULAR);

  const selectedSortTypeHandler = (sortType: string) => {
    setSelectedSortType(sortType);
    getSortedOffers(sortType, offersList);
  };

  const [{ city }] = offersList;
  const [
    {
      city: { name },
    },
  ] = offersList;
  const propertyNumber: number = offersList.length;

  const getSortedOffers = (sortType: string, offers: Offers): Offers => {
    switch (sortType) {
      case SortingType.PRICE_DOWN:
        return getSortedOffersPriceDown(offers);
      case SortingType.PRICE_UP:
        return getSortedOffersPriceUp(offers);
      case SortingType.TOP_RATED:
        return getSortedOffersTopRated(offers);
      default:
        return offersList;
    }
  };

  const sortedOffers = getSortedOffers(selectedSortType, offersList);

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <MainLocationList cities={cities} />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {propertyNumber} {`${propertyNumber < 2 ? 'place' : 'places'}`}{' '}
                to stay in {name}
              </b>
              <MainSortingList
                selectedSortTypeHandler={selectedSortTypeHandler}
                selectedSortType={selectedSortType}
              />
              <ListOffers offers={sortedOffers} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offersList={offersList} city={city} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
