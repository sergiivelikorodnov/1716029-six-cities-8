import { AuthorizationStatus, FetchStatus } from '../consts';
import { RootState } from '../store/reducers/root';
import { FrontAuthInfo } from './auth-data';
import { Comments } from './comment-get';
import { Offer, Offers } from './offer';

export type AuthDataType = {
  authorizationStatus: AuthorizationStatus;
  userAuthInfo: FrontAuthInfo;
}

export type OffersDataType = {
  offers: Offers;
  nearbyOffers: Offers;
  favoritesOffers: Offers;
  isDataLoaded: boolean;
}

export type LocationDataType = {
  currentCity: string;
  currentOffer: Offer;
}

export type CommentsDataType = {
  comments: Comments;
  isDataLoaded: boolean;
}

export type FetchStatusType = {
  fetchStatus: FetchStatus;
}

export type State = RootState;
