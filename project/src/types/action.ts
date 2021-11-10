import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { State } from './state';
import { AxiosInstance } from 'axios';
import { Action } from 'redux';

export enum ActionType {
  ChangeCity = 'changeCity',
  SelectCity = 'selectCity',
  LoadOffersData = 'loadOffersData',
  LoadSingleOfferData = 'loadSingleOfferData',
  RequireAuthorization = 'requireAuthorization',
  RequireLogout = 'requireLogout',
  RedirectToRoute = 'redirectToRoute',
  SetUserAuthInfo = 'setUserAuthInfo',
  NearbyOffersData = 'nearbyOfferData',
  FavoritesOffersData = 'favoritesOffersData',
  GetCommentsData = 'getCommentsData',
  SetFetchStatusData = 'fetchStatus'
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<
  R,
  State,
  AxiosInstance,
  Action
>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
