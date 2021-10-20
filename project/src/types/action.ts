import { type } from 'os';

export enum ActionType {
  ChangeToAmsterdam = 'city/amsterdam',
  OffersList = 'offersList/load'
}

export type ChangeToAmsterdam = {
  type: ActionType.ChangeToAmsterdam;
  payload: string;
}

export type LoadOffersList = {
  type: ActionType.OffersList;
}

export type Action = ChangeToAmsterdam | LoadOffersList;
