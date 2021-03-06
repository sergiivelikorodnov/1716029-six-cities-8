import { isLogged } from '../../utils/utils';
import PropertyReviewsForm from '../property-reviews-form/property-reviews-form';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../header/header';
import LoadingScreen from '../loading-screen/loading-screen';
import {
  fetchCommentsAction,
  fetchNearByOffersAction,
  fetchSingleOfferAction
} from '../../store/api-actions';
import { useCallback, useEffect, useState } from 'react';
import { APIRoute, AppRoute, FetchStatus, NotificationMessage } from '../../consts';

import MapNearestPlaces from '../map-nearest-places/map-nearest-places';
import {
  getAuthorizationStatus,
  getComments,
  getCurrentOffer,
  getFetchStatus,
  getNearByOffers
} from '../../store/selectors';
import PropertyComments from '../property-comments/property-comments';
import { setFetchStatusAction } from '../../store/action';
import { toast } from 'react-toastify';
import { BackOffer } from '../../types/backdata-offer';
import PropertyCartOffer from '../property-cart-offer/property-cart-offer';
import { createApiWithoutCallback } from '../../services/api';

function Property(): JSX.Element {
  const dispatch = useDispatch();

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const currentOffer = useSelector(getCurrentOffer);
  const nearbyOffers = useSelector(getNearByOffers);
  const comments = useSelector(getComments);
  const fetchStatus = useSelector(getFetchStatus);

  const { id: urlId } = useParams<{ id: string }>();

  const history = useHistory();

  const initFetch = useCallback(() => {
    dispatch(setFetchStatusAction(FetchStatus.InProgress));
    dispatch(fetchSingleOfferAction(Number(urlId)));
    dispatch(fetchNearByOffersAction(Number(urlId)));
    dispatch(fetchCommentsAction(Number(urlId)));
  }, [dispatch, urlId]);

  useEffect(() => {
    initFetch();
  }, [urlId, initFetch]);

  const initFetchStatus = useCallback(() => {
    dispatch(setFetchStatusAction(FetchStatus.Success));
  }, [dispatch]);

  useEffect(() => {
    if (currentOffer && currentOffer.id === Number(urlId) && nearbyOffers) {
      initFetchStatus();
    }
  }, [currentOffer, initFetchStatus, nearbyOffers, urlId]);


  const [activeOffer, setActiveOffer] = useState(0);
  const offerHandler = (idActive: number) => {
    setActiveOffer(idActive);
  };

  if (fetchStatus === FetchStatus.InProgress || currentOffer === null) {
    return <LoadingScreen />;
  }

  const {
    id,
    price,
    rating,
    bedrooms,
    title,
    description,
    host,
    images,
    maxAdults,
    goods,
    isPremium,
    city,
    isFavorite,
  } = currentOffer;


  const { name, avatarUrl, isPro } = host;

  const api = createApiWithoutCallback();

  const setFavoriteHandler = async (idOffer: number): Promise<void> => {
    const favoriteStatus = Number(!isFavorite);
    await api
      .post<BackOffer>(`${APIRoute.Favorites}/${idOffer}/${favoriteStatus}`)
      .then(({ data }) => {
        dispatch(fetchSingleOfferAction(Number(urlId)));
        if (!favoriteStatus) {
          toast.success(NotificationMessage.FavoriteRemove);
        } else {
          toast.success(NotificationMessage.FavoriteAdd);
        }
      })
      .catch(()=> toast.success(NotificationMessage.ConnecError));
  };

  const MAX_GALLERY_IMAGES = 6;


  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container" data-testid='gallery'>
            <div className="property__gallery">
              {images.slice(0, MAX_GALLERY_IMAGES).map((image) => {
                const keyValue = `${id}-${image}`;
                return (
                  <div key={keyValue} className="property__image-wrapper">
                    <img className="property__image" src={image} alt={title} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium ? (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              ) : (
                ''
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name" data-testid='title'>{title}</h1>
                <button
                  onClick={
                    isLogged(authorizationStatus)
                      ? () => setFavoriteHandler(id)
                      : () => history.push(AppRoute.Login)
                  }
                  className={`property__bookmark-button ${
                    isFavorite ? 'property__bookmark-button--active' : ''
                  } button`}
                  type="button"
                  data-testid = "favorite-button"
                >
                  <svg
                    className="property__bookmark-icon"
                    width="31"
                    height="33"
                  >
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${Math.round(rating) * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">
                  {Math.round(rating)}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  Apartment
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} {`${bedrooms > 1}` ? 'Bedrooms' : 'Bedroom'}
                  Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} {`${maxAdults > 1}` ? 'adults' : 'adult'}
                </li>
              </ul>
              <div className="property__price" data-testid="price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good) => (
                    <li key={`${id}-${good}`} className="property__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{name}</span>
                  {isPro ? (
                    <span className="property__user-status">Pro</span>
                  ) : (
                    ''
                  )}
                </div>
                <div className="property__description" data-testid="description">
                  <p className="property__text">{description}</p>
                </div>
              </div>
              <section className="property__reviews reviews" data-testid="reviews">
                <PropertyComments comments={comments} />
                {isLogged(authorizationStatus) ? <PropertyReviewsForm /> : ''}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <MapNearestPlaces
              offersList={nearbyOffers}
              city={city}
              currentOffer={currentOffer}
              activeOffer={activeOffer}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {nearbyOffers.map((similarOffer) => (
                <PropertyCartOffer
                  key={similarOffer.id}
                  offer={similarOffer}
                  onHoverOfferHandler={offerHandler}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Property;
