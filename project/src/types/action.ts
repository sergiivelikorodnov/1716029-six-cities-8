import { changeCityAction, loadOffersAction, loadSingleOfferAction, redirectToRoute, requireAuthorization, requireLogout, selectCurrentCityAction, setUserAuthInfo } from '../store/action';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { State } from './state';
import { AxiosInstance } from 'axios';


export enum ActionType {
  ChangeCity = 'changeCity',
  SelectCity = 'selectCity',
  LoadOfferData = 'loadOfferData',
  LoadSingleOfferData = 'loadSingleOfferData',
  RequireAuthorization = 'requireAuthorization',
  RequireLogout = 'requireLogout',
  RedirectToRoute = 'redirectToRoute',
  SetUserAuthInfo = 'setUserAuthInfo'
}


export type Actions =
  | ReturnType<typeof changeCityAction>
  | ReturnType<typeof loadOffersAction>
  | ReturnType<typeof selectCurrentCityAction>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>
  | ReturnType<typeof setUserAuthInfo>
  | ReturnType<typeof loadSingleOfferAction>

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
