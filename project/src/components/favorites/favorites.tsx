import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import ListOffersFavorite from '../list-offers-favorite/list-offers-favorite';
import { groupBy } from 'lodash';
import { AppRoute } from '../../consts';
import Header from '../header/header';
import { State } from '../../types/state';
import { fetchFavoritesOffersAction } from '../../store/api-actions';
import { ThunkAppDispatch } from '../../types/action';
import { connect, ConnectedProps } from 'react-redux';
import { useEffect } from 'react';
import LoadingScreen from '../loading-screen/loading-screen';

const mapStateToProps = ({favoritesOffers, isDataLoaded}: State) => ({
  favoritesOffers,
  isDataLoaded,
});

const mapDispatchToProps = (dispatch:ThunkAppDispatch) => ({
  loadOffersData() {
    dispatch(fetchFavoritesOffersAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Favorites({ favoritesOffers, loadOffersData, isDataLoaded=false }: PropsFromRedux): JSX.Element {

  useEffect(() => {
    loadOffersData();
  }, [loadOffersData]);


  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  const groupedOffers = groupBy(
    favoritesOffers,
    (offer: Offer) => offer.city.name,
  );

  if (favoritesOffers.length === 0) {
    return (
      <div className="page">
        <Header/>
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <Link className="footer__logo-link" to={AppRoute.Main}>
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width="64"
              height="33"
            />
          </Link>
        </footer>
      </div>
    );
  }

  return (
    <div className="page">
      <Header/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(groupedOffers).map(([city, offersList]) => (
                <ListOffersFavorite
                  key={offersList[0].id}
                  offers={offersList}
                  city={city}
                />
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </Link>
      </footer>
    </div>
  );
}

export {Favorites};
export default connector(Favorites);
