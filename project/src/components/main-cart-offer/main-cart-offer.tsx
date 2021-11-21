import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { APIRoute, AppRoute, DEFAULT_SINGLE_OFFER, NotificationMessage } from '../../consts';
import { Offer } from '../../types/offer';
import { isLogged } from '../../utils/utils';
import { getAuthorizationStatus } from '../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { BackOffer } from '../../types/backdata-offer';
import { fetchSingleOfferAction } from '../../store/api-actions';
import { loadSingleOfferAction } from '../../store/action';
import { createApiWithoutCallback } from '../../services/api';
import { adaptSingleOfferBackToFront } from '../../utils/adapters';

type SingleOffer = {
  offer: Offer;
};

function CartOffer({ offer }: SingleOffer): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const { id, price, rating, title, isPremium, isFavorite, previewImage } =
    offer;

  const [isFavoriteStatus, setIsFavoriteStatus] = useState(isFavorite);

  const api = createApiWithoutCallback();

  const history = useHistory();
  const dispatch = useDispatch();

  const setFavoriteHandler = async (idOffer: number): Promise<void> => {
    await api
      .post<BackOffer>(`${APIRoute.Favorites}/${idOffer}/${Number(!isFavoriteStatus)}`)
      .then(({ data }) => {
        setIsFavoriteStatus(adaptSingleOfferBackToFront(data).isFavorite);
        if (isFavorite) {
          toast.success(NotificationMessage.FavoriteRemove);
        } else {
          toast.success(NotificationMessage.FavoriteAdd);
        }
      })
      .catch(() => toast.success(NotificationMessage.ConnecError));
  };

  return (
    <article
      className="cities__place-card place-card"
      onMouseOver={() => dispatch(fetchSingleOfferAction(id))}
      onMouseOut={() => dispatch(loadSingleOfferAction(DEFAULT_SINGLE_OFFER))}
    >
      {isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) : (
        ''
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Room}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick={
              isLogged(authorizationStatus)
                ? () => setFavoriteHandler(id)
                : () => history.push(AppRoute.Login)
            }
            className={`place-card__bookmark-button ${
              isFavoriteStatus ? 'place-card__bookmark-button--active' : ''
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
          <Link to={`${AppRoute.Room}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">Private room</p>
      </div>
    </article>
  );
}

export default CartOffer;
