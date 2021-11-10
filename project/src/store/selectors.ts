import { AuthorizationStatus, FetchStatus } from '../consts';
import { Comments } from '../types/comment-get';
import { Offer, Offers } from '../types/offer';
import { State } from '../types/state';
import { NameSpace } from './reducers/root';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.auth].authorizationStatus;

export const getAllOffers = (state: State): Offers => state[NameSpace.offers].offers;
export const getFavoriteOffers = (state: State): Offers => state[NameSpace.offers].favoritesOffers;
export const getNearByOffers = (state: State): Offers => state[NameSpace.offers].nearbyOffers;

export const getCurrentOffer = (state: State): Offer => state[NameSpace.location].currentOffer;
export const getCurrentCity = (state: State): string => state[NameSpace.location].currentCity;

export const getComments = (state: State): Comments => state[NameSpace.comments].comments;

export const getFetchStatus = (state: State): FetchStatus => state[NameSpace.status].fetchStatus;
