import { AuthorizationStatus, DEFAULT_CITY, FetchStatus, TEST_CITY } from '../consts';
import { FrontAuthInfo } from '../types/auth-data';
import { Comments } from '../types/comment-get';
import { Offer, Offers } from '../types/offer';
import { fakeFrontendComments } from './mock-comments';
import { fakeFrontendOffers, firstFrontendOffer } from './mock-offers';
import { userFrontend } from './mock-userData';

export type fakeState = {
  AUTH: {
    authorizationStatus: AuthorizationStatus,
    userAuthInfo: FrontAuthInfo,
  },
  OFFERS: {
    offers: Offers,
    nearbyOffers: Offers,
    favoritesOffers: Offers,
  },
  LOCATION: {
    currentCity: string,
    currentOffer: Offer,
  },
  COMMENTS: {
    comments: Comments,
  },
  FETCH_STATUS: {
    fetchStatus: FetchStatus,
  },
};

export const fakeStateNoAuth:fakeState = {
  AUTH: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userAuthInfo: userFrontend,
  },
  OFFERS: {
    offers: fakeFrontendOffers,
    nearbyOffers: fakeFrontendOffers.slice(0,3),
    favoritesOffers: fakeFrontendOffers,
  },
  LOCATION: {
    currentCity: DEFAULT_CITY,
    currentOffer: firstFrontendOffer,
  },
  COMMENTS: {
    comments: fakeFrontendComments,
  },
  FETCH_STATUS: {
    fetchStatus: FetchStatus.Success,
  },
};

export const fakeStateAuth:fakeState = {
  AUTH: {
    authorizationStatus: AuthorizationStatus.Auth,
    userAuthInfo: userFrontend,
  },
  OFFERS: {
    offers: fakeFrontendOffers,
    nearbyOffers: fakeFrontendOffers.slice(0,3),
    favoritesOffers: fakeFrontendOffers,
  },
  LOCATION: {
    currentCity: DEFAULT_CITY,
    currentOffer: firstFrontendOffer,
  },
  COMMENTS: {
    comments: fakeFrontendComments,
  },
  FETCH_STATUS: {
    fetchStatus: FetchStatus.Success,
  },
};

export const fakeStateAmsterdamAuth:fakeState = {
  AUTH: {
    authorizationStatus: AuthorizationStatus.Auth,
    userAuthInfo: userFrontend,
  },
  OFFERS: {
    offers: fakeFrontendOffers,
    nearbyOffers: fakeFrontendOffers.slice(0,3),
    favoritesOffers: fakeFrontendOffers,
  },
  LOCATION: {
    currentCity: TEST_CITY,
    currentOffer: firstFrontendOffer,
  },
  COMMENTS: {
    comments: fakeFrontendComments,
  },
  FETCH_STATUS: {
    fetchStatus: FetchStatus.Success,
  },
};

export const fakeStateAuthInProgress:fakeState = {
  AUTH: {
    authorizationStatus: AuthorizationStatus.Auth,
    userAuthInfo: userFrontend,
  },
  OFFERS: {
    offers: fakeFrontendOffers,
    nearbyOffers: fakeFrontendOffers.slice(0,3),
    favoritesOffers: fakeFrontendOffers,
  },
  LOCATION: {
    currentCity: DEFAULT_CITY,
    currentOffer: firstFrontendOffer,
  },
  COMMENTS: {
    comments: fakeFrontendComments,
  },
  FETCH_STATUS: {
    fetchStatus: FetchStatus.InProgress,
  },
};
