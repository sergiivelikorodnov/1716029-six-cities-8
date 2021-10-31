import { AppRoute, AuthorizationStatus } from '../consts';
import { ActionType } from '../types/action';
import { Offer, Offers } from '../types/offer';

export const changeCityAction = (newCity: string) =>
  ({
    type: ActionType.ChangeCity,
    payload: newCity,
  } as const);

export const selectCurrentCityAction = (offer: Offer | null) =>
  ({
    type: ActionType.SelectCity,
    payload: offer,
  } as const);

export const loadOffersAction = (offers: Offers) =>
  ({
    type: ActionType.LoadOfferData,
    payload: offers,
  } as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) =>
  ({
    type: ActionType.RequireAuthorization,
    payload: authStatus,
  } as const);

export const requireLogout = () =>
  ({
    type: ActionType.RequireLogout,
  } as const);

export const redirectToRoute = (url:AppRoute) =>
  ({
    type: ActionType.RedirectToRoute,
    payload: url,
  } as const);
