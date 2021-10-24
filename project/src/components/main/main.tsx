import { Link } from 'react-router-dom';
import { Offer, Offers } from '../../types/offer';
import Logo from '../logo/logo';
import ListOffers from '../list-offers/list-offers';
import { useState } from 'react';
import Map from '../map/map';
import {CITY} from '../../mocks/city';
import MainLocationList from '../main-location-list/main-location-list';

type Property = {
  cities: string[];
  offersList: Offers;
}

function Main({ cities, offersList }: Property): JSX.Element{
  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined,
  );
  const offerHandler = (id: number) => {
    const currentPoint = offersList.find((point) => point.id=== id);
    setSelectedPoint(currentPoint);
  };
  const [{ city: {name} }] = offersList;
  const propertyNumber: number = offersList.length;
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link"  to="/">
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

        <MainLocationList cities={ cities }/>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{propertyNumber} places to stay in {name}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <ListOffers
                  offers={offersList}
                  onHoverOfferHandler={offerHandler}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={CITY} points={offersList} selectedPoint={selectedPoint} mapHeigth={'100%'}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
