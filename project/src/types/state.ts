import { AuthorizationStatus } from '../consts';
import { FrontAuthInfo } from './auth-data';
import { Comments } from './comment-get';
import { Offer, Offers } from './offer';

export type State = {
  currentCity: string;
  offers: Offers;
  currentOffer: Offer;
  authorizationStatus: AuthorizationStatus;
  isDataLoaded: boolean;
  userAuthInfo: FrontAuthInfo;
  nearbyOffers: Offers;
  favoritesOffers: Offers;
  comments: Comments;
  commentLoading: boolean;
}
