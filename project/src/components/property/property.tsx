import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../consts';
import { Comments } from '../../types/comment-get';
import { Offers } from '../../types/offer';
import { getDateTime, getHumanDate } from '../../utils/utils';
import CartOffer from '../cart-offer/cart-offer';
import Logo from '../logo/logo';
import Map from '../map/map';
import ReviewsForm from '../reviews-form/reviews-form';
import { useParams } from 'react-router-dom';

const MAX_SIMILAR_OFFERS = 3;

type SingleProperty = {
  offers: Offers;
  comments: Comments;
  authorizationStatus: AuthorizationStatus;
};
function Property(props: SingleProperty): JSX.Element {
  const { offers, comments, authorizationStatus } = props;
  const { id: urlId } = useParams<{ id: string }>();
  const offer = offers.filter((room) => room.id === Number(urlId));
  const similarOffers = offers.filter((room) => room.id !== Number(urlId)).slice(0, MAX_SIMILAR_OFFERS);

  const [
    {
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
    },
  ] = offer;
  const { name, avatarUrl, isPro } = host;
  const isLogged = AuthorizationStatus.Auth === authorizationStatus;

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to="/favorites"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/">
                    <span className="header__signout">Sign out{id}</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
                  className={`property__bookmark-button ${
                    isFavorite ? 'property__bookmark-button--active' : ''
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
                {isLogged ? <ReviewsForm /> : ''}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map offersList={similarOffers} city={city} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {similarOffers.map((similarOffer) => (
                <CartOffer key={similarOffer.id} offer={similarOffer} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Property;
