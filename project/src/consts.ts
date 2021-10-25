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

export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_ACTIVE = 'img/pin-active.svg';

export const DEFAULT_CITY = 'Amsterdam';
