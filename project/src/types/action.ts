import { changeCityAction, loadListAction } from '../store/action';

export enum ActionType {
  ChangeCity = 'changeCity',
  LoadOfferData = 'loadOfferData',
}


export type ActionTypes =
  | ReturnType<typeof changeCityAction>
  | ReturnType<typeof loadListAction>
