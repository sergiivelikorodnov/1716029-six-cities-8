import { AuthorizationStatus, DEFAULT_CITY, FetchStatus } from '../consts';
import { State } from '../types/state';
import { fakeFrontendComments } from './mock-comments';
import { fakeFrontendOffers, firstFrontendOffer } from './mock-offers';
import { userFrontend } from './mock-userData';

export const fakeStateNoAuth:State = {
  AUTH: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userAuthInfo: userFrontend,
  },
  OFFERS: {
    offers: fakeFrontendOffers,
    nearbyOffers: fakeFrontendOffers.slice(0,3),
    favoritesOffers: fakeFrontendOffers.slice(0),
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

export const fakeStateAuth:State = {
  AUTH: {
    authorizationStatus: AuthorizationStatus.Auth,
    userAuthInfo: userFrontend,
  },
  OFFERS: {
    offers: fakeFrontendOffers,
    nearbyOffers: fakeFrontendOffers.slice(0,3),
    favoritesOffers: fakeFrontendOffers.slice(0),
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
