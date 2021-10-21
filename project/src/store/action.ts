import {  ActionType } from '../types/action';
import { Offers } from '../types/offer';

export const changeCityAction = (newCity: string, allOffers:Offers) => ({
  type: ActionType.ChangeCity,
  payload: {
    city: newCity,
    offerList: allOffers.filter((offer)=>offer.city.name === newCity),
  },
} as const);

export const loadListAction = () => ({
  type: ActionType.LoadOfferData,
} as const);
