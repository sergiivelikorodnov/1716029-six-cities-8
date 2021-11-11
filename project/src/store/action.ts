import { AppRoute, AuthorizationStatus, FetchStatus } from '../consts';
import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/action';
import { FrontAuthInfo } from '../types/auth-data';
import { Comments } from '../types/comment-get';
import { Offer, Offers } from '../types/offer';

export const changeCityAction = createAction(
  ActionType.ChangeCity,
  (newCity: string) => ({
    type: ActionType.ChangeCity,
    payload: newCity,
  }),
);

export const loadOffersAction = createAction(
  ActionType.LoadOffersData,
  (offers: Offers) => ({
    payload: offers,
  }),
);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({
    payload: authStatus,
  }),
);

export const requireLogout = createAction(ActionType.RequireLogout);

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: AppRoute) => ({
    payload: url,
  }),
);

export const setUserAuthInfo = createAction(
  ActionType.SetUserAuthInfo,
  (userInfo: FrontAuthInfo) => ({
    payload: userInfo,
  }),
);

export const loadSingleOfferAction = createAction(
  ActionType.LoadSingleOfferData,
  (offer: Offer) => ({
    payload: offer,
  }),
);

export const nearbyOffersDataAction = createAction(
  ActionType.NearbyOffersData,
  (offers: Offers) => ({
    payload: offers,
  }),
);

export const favoriteOffersDataAction = createAction(
  ActionType.FavoritesOffersData,
  (offers: Offers) => ({
    payload: offers,
  }),
);

export const getCommentsAction = createAction(
  ActionType.GetCommentsData,
  (comments: Comments) => ({
    payload: comments,
  }),
);

export const setFetchStatusAction = createAction(
  ActionType.SetFetchStatusData,
  (fetchStatus: FetchStatus) => ({
    payload: fetchStatus,
  }),
);
