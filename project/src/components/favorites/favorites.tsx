import { Offer } from '../../types/offer';
import FavoriteListOffers from '../favorite-list-offers/favorite-list-offers';
import { groupBy } from 'lodash';
import { FetchStatus } from '../../consts';
import Header from '../header/header';
import { fetchFavoritesOffersAction } from '../../store/api-actions';
import { useCallback, useEffect } from 'react';
import LoadingScreen from '../loading-screen/loading-screen';
import { getFavoriteOffers, getFetchStatus } from '../../store/selectors';
import { useSelector, useDispatch } from 'react-redux';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import Footer from '../footer/footer';

function Favorites(): JSX.Element {
  const favoritesOffers = useSelector(getFavoriteOffers);
  const fetchStatus:FetchStatus = useSelector(getFetchStatus);

  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(fetchFavoritesOffersAction());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const groupedOffers = groupBy(
    favoritesOffers,
    (offer: Offer) => offer.city.name,
  );

  if (favoritesOffers.length === 0) {
    return (
      <div className="page">
        <FavoritesEmpty/>
      </div>
    );
  }

  return (
    <div className="page">
      {fetchStatus === FetchStatus.InProgress ? <LoadingScreen /> :
        <>
          < Header />
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {Object.entries(groupedOffers).map(([city, offersList]) => (
                    <FavoriteListOffers
                      key={offersList[0].id}
                      offers={offersList}
                      city={city}
                    />
                  ))}
                </ul>
              </section>
            </div>
          </main>
          <Footer/>
        </>}
    </div>
  );
}

export default Favorites;
