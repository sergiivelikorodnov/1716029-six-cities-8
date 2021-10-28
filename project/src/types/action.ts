import { changeCityAction, loadListAction, requireAuthorization, requireLogout, selectCurrentCityAction } from '../store/action';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { State } from './state';
import { AxiosInstance } from 'axios';


export enum ActionType {
  ChangeCity = 'changeCity',
  SelectCity = 'selectCity',
  LoadOfferData = 'loadOfferData',
  RequireAuthorization = 'requireAuthorization',
  RequireLogout = 'requireLogout'
}


export type Actions =
  | ReturnType<typeof changeCityAction>
  | ReturnType<typeof loadListAction>
  | ReturnType<typeof selectCurrentCityAction>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
