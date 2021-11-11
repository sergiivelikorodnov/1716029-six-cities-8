import { Offers } from '../../types/offer';
import MainCartOffer from '../main-cart-offer/main-cart-offer';

type CardsOffers = {
  offers: Offers;
  onHoverOfferHandler(id: number): void;
};

function MainListOffers({ offers, onHoverOfferHandler }: CardsOffers): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <MainCartOffer
          key={offer.id}
          offer={offer}
          onHoverOfferHandler={onHoverOfferHandler}
        />
      ))}
    </div>
  );
}

export default MainListOffers;
