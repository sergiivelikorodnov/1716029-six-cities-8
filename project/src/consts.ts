import { RatingValues } from './types/consts';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer',
  NotFoundOffer = '/404'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const CITIES: string[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const SortingType = {
  POPULAR: 'Popular',
  PRICE_UP: 'Price: low to high',
  PRICE_DOWN: 'Price: high to low',
  TOP_RATED: 'Top rated first',
};

export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_ACTIVE = 'img/pin-active.svg';

export const ADD_FAVORITE_OFFER = 'Предложение было добавлено в избранное';

export const DEFAULT_CITY = 'Paris';
export const TEST_CITY = 'Amsterdam';

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Favorites = '/favorite',
  Comments = '/comments'
}

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;

export const ratingValues: RatingValues = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly',
};

export enum NotificationMessage {
  AuthError = 'Something went wrong. Check your email and password',
  CheckAuth = 'Login to see more functinality',
  ConnecError = 'Check your connection please',
  OffersError = 'We couldn\'t get Offers. Check your connection',
  OfferError = 'Something went wrong. Check your connection',
  NearPlacesError = 'We can\'t get Recommended places. Check your connection please',
  CommentsGetErr = 'Ooops, we can\'t get comments. Check your connection',
  CommentsPostErr = 'Ooops, we can\'t post your comment. Check your connection',
  CommentsPostSuccess = 'Your comments was added',
  FavoriteAdd = 'Offer is added to Favorite list',
  FavoriteRemove = 'Offer is removed from Favorite list'
}

export enum FetchStatus {
  InProgress = 'IN_PROGRESS',
  Success = 'SUCCESS'
}
