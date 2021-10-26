import { Offers } from '../../types/offer';
import CartOfferFavorite from '../card-offer-favorite/card-offer-favorite';

type CityFavoriteOffers = {
  offers: Offers;
  city: string;
};

function ListOffersFavorite({ offers, city }: CityFavoriteOffers): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city} </span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <CartOfferFavorite key={offer.id} offer={offer} />
        ))}
      </div>
    </li>
  );
}

export default ListOffersFavorite;
