import { Link } from 'react-router-dom';
import { Offer, Offers } from '../../types/offer';
import Logo from '../logo/logo';
import ListOffersFavorite from '../list-offers-favorite/list-offers-favorite';
import { groupBy } from 'lodash';
import { AppRoute } from '../../consts';

type FavoriteOffers = {
  favOffers: Offers;
}

function Favorites({favOffers}: FavoriteOffers): JSX.Element{
  const favoriteOffers = favOffers
    .slice()
    .filter((offer) => offer.isFavorite);
  const groupedOffers = groupBy(favoriteOffers, (offer:Offer) => offer.city.name);
  return (
    <div className="page">
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
                  <Link className="header__nav-link" to="/">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(groupedOffers).map(([city, offersList]) => <ListOffersFavorite key={offersList[0].id} offers={offersList} city={city}/>)}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default Favorites;
