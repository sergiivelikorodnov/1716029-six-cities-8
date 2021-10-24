import { changeCityAction, loadListAction, selectCurrentCityAction } from '../store/action';

export enum ActionType {
  ChangeCity = 'changeCity',
  SelectCity = 'selectCity',
  LoadOfferData = 'loadOfferData',
}


export type Actions =
  | ReturnType<typeof changeCityAction>
  | ReturnType<typeof loadListAction>
  | ReturnType<typeof selectCurrentCityAction>
