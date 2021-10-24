import { Offers } from '../../types/offer';
import CartOffer from '../cart-offer/cart-offer';

type CardsOffers = {
  offers: Offers;
}

function ListOffers({ offers }: CardsOffers): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map(
        (offer) => (<CartOffer key={offer.id} offer={offer}/>),
      )}

    </div>
  );
}

export default ListOffers;
