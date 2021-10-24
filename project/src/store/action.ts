import {  ActionType } from '../types/action';
import { Offer, Offers } from '../types/offer';

export const changeCityAction = (newCity: string) => ({
  type: ActionType.ChangeCity,
  payload: newCity,
} as const);

export const selecetCurrentCityAction = (offer: Offer) => ({
  type: ActionType.SelectCity,
  payload: offer,
} as const);

export const loadListAction = (offers:Offers) => ({
  type: ActionType.LoadOfferData,
  payload: offers,
} as const);
