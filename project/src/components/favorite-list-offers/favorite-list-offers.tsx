import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { changeCityAction } from '../../store/action';
import { Offers } from '../../types/offer';
import CartOfferFavorite from '../favorite-card-offer/favorite-card-offer';

type CityFavoriteOffers = {
  offers: Offers;
  city: string;
};


function ListOffersFavorite({ offers, city }: CityFavoriteOffers): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCityButton = (evt: MouseEvent, selectedCity:string) => {
    evt.preventDefault();

    dispatch(changeCityAction(selectedCity));
    history.push(AppRoute.Main);
  };

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link
            className="locations__item-link"
            onClick={(evt)=>handleCityButton(evt, city)}
            to=""
          >
            <span>{city}</span>
          </Link>
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
