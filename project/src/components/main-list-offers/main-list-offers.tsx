import { Offers } from '../../types/offer';
import MainCartOffer from '../main-cart-offer/main-cart-offer';

type CardsOffers = {
  offers: Offers;
};

function MainListOffers({ offers }: CardsOffers): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <MainCartOffer
          key={offer.id}
          offer={offer}
        />
      ))}
    </div>
  );
}

export default MainListOffers;
