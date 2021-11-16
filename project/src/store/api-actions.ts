import { toast } from 'react-toastify';
import {
  APIRoute,
  AppRoute,
  AuthorizationStatus,
  FetchStatus,
  NotificationMessage
} from '../consts';
import { dropAuthStatus, saveAuthStatus } from '../services/auth-status';
import { dropEmail, saveEmail } from '../services/email';
import { dropToken, saveToken } from '../services/token';
import { ThunkActionResult } from '../types/action';
import { AuthData, BackAuthInfo } from '../types/auth-data';
import { BackOffer, BackOffers } from '../types/backdata-offer';
import { CommentsBackend } from '../types/comment-get';
import {
  adaptCommentsBackToFront,
  adaptOffersBackToFront,
  adaptSingleOfferBackToFront,
  adaptUserBackToFront
} from '../utils/adapters';
import {
  favoriteOffersDataAction,
  getCommentsAction,
  loadOffersAction,
  loadSingleOfferAction,
  nearbyOffersDataAction,
  redirectToRoute,
  requireAuthorization,
  requireLogout,
  setFetchStatusAction,
  setUserAuthInfo
} from './action';

export const fetchOffersAction =
  (): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      dispatch(setFetchStatusAction(FetchStatus.InProgress));
      await api
        .get<BackOffers>(APIRoute.Offers)
        .then(({ data }) => {
          dispatch(loadOffersAction(adaptOffersBackToFront(data)));
          dispatch(setFetchStatusAction(FetchStatus.Success));
        })
        .catch(() => toast.error(NotificationMessage.OffersError));
    };

export const fetchSingleOfferAction =
  (id: number): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      await api
        .get<BackOffer>(`${APIRoute.Offers}/${id}`)
        .then(({ data }) => {
          if (!data) {
            dispatch(redirectToRoute(AppRoute.NotFoundOffer));
            return;
          }
          dispatch(loadSingleOfferAction(adaptSingleOfferBackToFront(data)));
        })
        .catch(() => toast.error(NotificationMessage.OfferError));
    };

export const fetchFavoritesOffersAction =
  (): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      dispatch(setFetchStatusAction(FetchStatus.InProgress));
      await api
        .get<BackOffers>(APIRoute.Favorites)
        .then(({ data }) => {
          dispatch(favoriteOffersDataAction(adaptOffersBackToFront(data)));
          dispatch(setFetchStatusAction(FetchStatus.Success));
        })
        .catch(() => toast.error(NotificationMessage.ConnecError));
    };

export const fetchNearByOffersAction =
  (id: number): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      await api
        .get<BackOffers>(`${APIRoute.Offers}/${id}/nearby`)
        .then(({ data }) => {
          dispatch(nearbyOffersDataAction(adaptOffersBackToFront(data)));
        })
        .catch(() => toast.error(NotificationMessage.NearPlacesError));
    };

export const fetchCommentsAction =
  (id: number): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      await api
        .get<CommentsBackend>(`${APIRoute.Comments}/${id}`)
        .then(({ data }) => {
          dispatch(getCommentsAction(adaptCommentsBackToFront(data)));
        })
        .catch(() => toast.error(NotificationMessage.CommentsGetErr));
    };

export const checkAuthAction =
  (): ThunkActionResult => async (dispatch, _getState, api) => {
    await api
      .get(APIRoute.Login)
      .then(({ status }) => {
        status &&
          status !== 401 &&
          dispatch(requireAuthorization(AuthorizationStatus.Auth)) &&
          saveAuthStatus(AuthorizationStatus.Auth);
      })
      .catch(() => {
        toast.error(NotificationMessage.ConnecError);
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
        saveAuthStatus(AuthorizationStatus.NoAuth);
      });
  };

export const loginAction =
  ({ login: email, password }: AuthData): ThunkActionResult =>
    async (dispatch, _getState, api) => {
      await api
        .post<BackAuthInfo>(APIRoute.Login, { email, password })
        .then(({ data }) => {
          saveAuthStatus(AuthorizationStatus.Auth);
          saveToken(data.token);
          saveEmail(data.email);
          dispatch(requireAuthorization(AuthorizationStatus.Auth));
          dispatch(setUserAuthInfo(adaptUserBackToFront(data)));
          dispatch(redirectToRoute(AppRoute.Main));
        })
        .catch(() => toast.error(NotificationMessage.AuthError));
    };

export const logoutAction =
  (): ThunkActionResult => async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dropEmail();
    dropAuthStatus();
    dispatch(requireLogout());
    dispatch(redirectToRoute(AppRoute.Login));
  };
