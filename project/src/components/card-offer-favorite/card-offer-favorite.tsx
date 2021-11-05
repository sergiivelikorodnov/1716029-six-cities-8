import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { api } from '../..';
import { APIRoute } from '../../consts';
import { fetchFavoritesOffersAction } from '../../store/api-actions';
import { ThunkAppDispatch } from '../../types/action';
import { Offer } from '../../types/offer';
import { adaptSingleOfferBackToFront } from '../../utils/adapters';

type SingleOffer = {
  offer: Offer;
};

const mapDispatchToProps = (dispatch:ThunkAppDispatch) => ({
  loadOffersData() {
    dispatch(fetchFavoritesOffersAction());
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & SingleOffer;

function CartOfferFavorite({ offer,loadOffersData }: ConnectedComponentProps): JSX.Element {
  const { id, type, price, rating, title, isFavorite, previewImage } = offer;

  const [isFavoriteStatus, setIsFavoriteStatus] = useState(isFavorite);

  const setFavoriteHandler = async (idOffer:number): Promise<void> => {
    const favoriteStatus = Number(!isFavoriteStatus);
    await api.post<Offer>(`${APIRoute.Favorites}/${idOffer}/${favoriteStatus}`)
      .then(({ data }) => {
        setIsFavoriteStatus(adaptSingleOfferBackToFront(data).isFavorite);
        loadOffersData();
      },
      );
  };

  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="150"
            height="110"
            alt={title}
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick = {()=>setFavoriteHandler(id)}
            className={`place-card__bookmark-button ${
              isFavorite ? 'place-card__bookmark-button--active' : ''
            } button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(rating) * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export {CartOfferFavorite};
export default connector(CartOfferFavorite);
