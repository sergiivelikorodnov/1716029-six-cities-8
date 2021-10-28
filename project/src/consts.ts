export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
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
  POPULAR : 'Popular',
  PRICE_UP : 'Price: low to high',
  PRICE_DOWN : 'Price: high to low',
  TOP_RATED : 'Top rated first',
};

export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_ACTIVE = 'img/pin-active.svg';

export const DEFAULT_CITY = 'Amsterdam';

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
}
