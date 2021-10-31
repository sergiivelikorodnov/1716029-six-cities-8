import { Link } from 'react-router-dom';
import { Offer, Offers } from '../../types/offer';
import ListOffersFavorite from '../list-offers-favorite/list-offers-favorite';
import { groupBy } from 'lodash';
import { AppRoute } from '../../consts';
import Header from '../header/header';

type FavoriteOffers = {
  favOffers: Offers;
};

function Favorites({ favOffers }: FavoriteOffers): JSX.Element {
  const favoriteOffers = favOffers.slice().filter((offer) => offer.isFavorite);
  const groupedOffers = groupBy(
    favoriteOffers,
    (offer: Offer) => offer.city.name,
  );
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

export default Favorites;
