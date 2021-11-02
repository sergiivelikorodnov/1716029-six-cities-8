import { adaptSingleOfferBackToFront, getDateTime, getHumanDate, isLogged } from '../../utils/utils';
import CartOffer from '../cart-offer/cart-offer';
import Map from '../map/map';
import ReviewsForm from '../reviews-form/reviews-form';
import { useHistory, useParams } from 'react-router-dom';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import Header from '../header/header';
import LoadingScreen from '../loading-screen/loading-screen';
import { ThunkAppDispatch } from '../../types/action';
import { fetchCommentssAction, fetchNearByOffersAction, fetchSingleOfferAction } from '../../store/api-actions';
import { useEffect, useState } from 'react';
import { APIRoute, AppRoute } from '../../consts';
import { api } from '../..';
import { Offer } from '../../types/offer';

const mapStateToProps = ({authorizationStatus, isDataLoaded, currentOffer, nearbyOffers, comments}: State) => ({
  authorizationStatus,
  isDataLoaded,
  currentOffer,
  nearbyOffers,
  comments,
});

const mapDispatchToProps = (dispatch:ThunkAppDispatch) => ({
  loadOfferData(id:number) {
    dispatch(fetchSingleOfferAction(id));
    dispatch(fetchNearByOffersAction(id));
    dispatch(fetchCommentssAction(id));
  },

});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Property({ comments, authorizationStatus, isDataLoaded=false, loadOfferData, nearbyOffers, currentOffer } : PropsFromRedux): JSX.Element {
  const history = useHistory();

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
  const { name, avatarUrl, isPro } = host;
  const [isFavoriteStatus, setIsFavoriteStatus] = useState(isFavorite);

  useEffect(() => {
    loadOfferData(Number(urlId));
    setIsFavoriteStatus(isFavorite);
  }, [loadOfferData, urlId, isFavorite]);

  if (!isDataLoaded) {
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
              {images.map((image) => {
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
                  onClick = {isLogged(authorizationStatus) ? ()=>setFavoriteHandler(id): ()=> history.push(AppRoute.Login)}
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
                  <span style={{ width: `${rating * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">
                  {rating}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  Apartment
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
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
                  {comments.map((comment) => {
                    const keyValue = `${comment.id}`;
                    return (
                      <li key={keyValue} className="reviews__item">
                        <div className="reviews__user user">
                          <div className="reviews__avatar-wrapper user__avatar-wrapper">
                            <img
                              className="reviews__avatar user__avatar"
                              src={comment.user.avatarUrl}
                              width="54"
                              height="54"
                              alt="Reviews avatar"
                            />
                          </div>
                          <span className="reviews__user-name">
                            {comment.user.name}
                          </span>
                        </div>
                        <div className="reviews__info">
                          <div className="reviews__rating rating">
                            <div className="reviews__stars rating__stars">
                              <span
                                style={{ width: `${comment.rating * 20}%` }}
                              >
                              </span>
                              <span className="visually-hidden">Rating</span>
                            </div>
                          </div>
                          <p className="reviews__text">{comment.comment}</p>
                          <time
                            className="reviews__time"
                            dateTime={getDateTime(comment.date)}
                          >
                            {getHumanDate(comment.date)}
                          </time>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                {isLogged(authorizationStatus) ? <ReviewsForm /> : ''}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map offersList={nearbyOffers} city={city} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {nearbyOffers.map((similarOffer) => (
                <CartOffer key={similarOffer.id} offer={similarOffer} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export {Property};
export default connector(Property);
