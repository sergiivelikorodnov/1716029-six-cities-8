import { isLogged } from '../../utils/utils';
import { adaptSingleOfferBackToFront } from '../../utils/adapters';
import CartOffer from '../cart-offer/cart-offer';
import ReviewsForm from '../reviews-form/reviews-form';
import { Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../header/header';
import LoadingScreen from '../loading-screen/loading-screen';
import { fetchCommentsAction, fetchNearByOffersAction, fetchSingleOfferAction } from '../../store/api-actions';
import { useEffect, useState } from 'react';
import { APIRoute, AppRoute, FetchStatus } from '../../consts';
import { api } from '../..';
import { Offer } from '../../types/offer';
import MapNearestPlaces from '../map-nearest-places/map-nearest-places';
import { getAuthorizationStatus, getComments, getCurrentOffer, getFetchStatus, getNearByOffers } from '../../store/selectors';
import PropertyComments from '../property-comments/property-comments';

function Property(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const currentOffer = useSelector(getCurrentOffer);
  const nearbyOffers = useSelector(getNearByOffers);
  const comments = useSelector(getComments);
  const fetchStatus = useSelector(getFetchStatus);

  const dispatch = useDispatch();

  const { id: urlId } = useParams<{ id: string }>();

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
    isFavorite,
    city,
  } = currentOffer;

  useEffect(() => {
    const loadOfferData = (idOffer:number) => {
      dispatch(fetchSingleOfferAction(idOffer));
      dispatch(fetchNearByOffersAction(idOffer));
      dispatch(fetchCommentsAction(idOffer));
    };
    loadOfferData(Number(urlId));
    setIsFavoriteStatus(isFavorite);
  }, [urlId, isFavorite, dispatch]);

  const [activeOffer, setActiveOffer] = useState(0);
  const offerHandler = (idActive: number) => {
    setActiveOffer(idActive);
  };

  const { name, avatarUrl, isPro } = host;
  const [isFavoriteStatus, setIsFavoriteStatus] = useState(isFavorite);

  if (fetchStatus=== FetchStatus.InProgress) {
    return (
      <LoadingScreen />
    );
  }

  const setFavoriteHandler = async (idOffer:number): Promise<void> => {
    const favoriteStatus = Number(!isFavoriteStatus);
    await api.post<Offer>(`${APIRoute.Favorites}/${idOffer}/${favoriteStatus}`)
      .then(({ data }) => {
        setIsFavoriteStatus(adaptSingleOfferBackToFront(data).isFavorite);
      },
      );
  };

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0, 6).map((image) => {
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
                <h1 className="property__name">{title}</h1>
                <button
                  onClick = {isLogged(authorizationStatus) ? ()=>setFavoriteHandler(id): ()=> <Redirect to={AppRoute.Login} />}
                  className={`property__bookmark-button ${
                    isFavoriteStatus ? 'property__bookmark-button--active' : ''
                  } button`}
                  type="button"
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
                  {bedrooms} {`${bedrooms>1}`? 'Bedrooms' : 'Bedroom'}Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} {`${maxAdults>1}`? 'adults' : 'adult'}
                </li>
              </ul>
              <div className="property__price">
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
                <div className="property__description">
                  <p className="property__text">{description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;{' '}
                  <span className="reviews__amount">{comments.length}</span>
                </h2>
                <ul className="reviews__list">
                  <PropertyComments comments={comments} />

                </ul>
                {isLogged(authorizationStatus) ? <ReviewsForm /> : ''}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <MapNearestPlaces offersList={nearbyOffers} city={city} currentOffer={currentOffer} activeOffer={ activeOffer}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {nearbyOffers.map((similarOffer) => (
                <CartOffer key={similarOffer.id} offer={similarOffer} onHoverOfferHandler={offerHandler}/>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Property;
