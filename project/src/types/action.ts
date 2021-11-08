import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { State } from './state';
import { AxiosInstance } from 'axios';
import { Action } from 'redux';


export enum ActionType {
  ChangeCity = 'changeCity',
  SelectCity = 'selectCity',
  LoadOfferData = 'loadOfferData',
  LoadSingleOfferData = 'loadSingleOfferData',
  RequireAuthorization = 'requireAuthorization',
  RequireLogout = 'requireLogout',
  RedirectToRoute = 'redirectToRoute',
  SetUserAuthInfo = 'setUserAuthInfo',
  NearbyOffersData = 'nearbyOfferData',
  FavoritesOffersData = 'favoritesOffersData',
  GetCommentsData = 'getCommentsData',
  PostCommentData = 'postCommentData',
  PostOfferCommentRequest = 'postOfferCommentRequest',
  PostOfferCommentSuccess = 'postOfferCommentSuccess',
  SetFetchStatusData = 'fetchStatus',
}


export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
