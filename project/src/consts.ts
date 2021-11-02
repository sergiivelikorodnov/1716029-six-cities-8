import { FrontAuthInfo } from './types/auth-data';
import { Offer } from './types/offer';

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
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Favorites = '/favorite',
  Comments = '/comments'
}

export const DEFAULT_SINGLE_OFFER:Offer = {
  bedrooms: 0,
  city: {
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    },
    name: '',
  },
  description: '',
  goods: [''],
  host: {
    avatarUrl: '',
    id: 99999999999999,
    isPro: false,
    name: '',
  },
  id: 99999999999999,
  images: [''],
  isFavorite: false,
  isPremium: false,
  location: {
    latitude: 0,
    longitude: 0,
    zoom: 0,
  },
  maxAdults: 0,
  previewImage: '',
  price: 0,
  rating: 0,
  title: '',
  type: 'apartment',
};

export const DEFAULT_USER_DATA:FrontAuthInfo = {
  avatarUrl: '../../public/img/avatar.svg',
  email: '',
  id: 99999999999999999999999999,
  isPro: false,
  name: '',
} as const;
