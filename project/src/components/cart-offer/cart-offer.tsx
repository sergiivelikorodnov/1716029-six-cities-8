import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';

type SingleOffer = {
  offer: Offer;
  onHoverOfferHandler(id: number): void;
}

function CartOffer({ offer, onHoverOfferHandler }: SingleOffer): JSX.Element {
  const { id, price, rating, title, isPremium, isFavorite, previewImage } = offer;

  return (
    <article className="cities__place-card place-card" onMouseOver={()=> onHoverOfferHandler(id)}>
      { isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>: ''}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={ previewImage } width="260" height="200" alt={ title} />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{ price }</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating*20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{ title }</Link>
        </h2>
        <p className="place-card__type">Private room</p>
      </div>
    </article>
  );
}

export default CartOffer;
