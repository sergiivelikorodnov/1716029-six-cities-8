import { Link } from 'react-router-dom';
import { Offers } from '../../types/offer';
import Logo from '../logo/logo';
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
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to="/favorites"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
