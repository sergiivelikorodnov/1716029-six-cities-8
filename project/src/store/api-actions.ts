import { toast } from 'react-toastify';
import { APIRoute, AppRoute, AuthorizationStatus, NotificationMessage } from '../consts';
import { dropAuthStatus, saveAuthStatus } from '../services/auth-status';
import { dropEmail, saveEmail } from '../services/email';
import { dropToken, saveToken } from '../services/token';
import { ThunkActionResult } from '../types/action';
import { AuthData, BackAuthInfo } from '../types/auth-data';
import { Comments } from '../types/comment-get';
import { CommentPost } from '../types/comment-post';
import { Offer, Offers } from '../types/offer';
import { adaptCommentsBackToFront, adaptOffersBackToFront, adaptSingleOfferBackToFront, adaptUserBackToFront } from '../utils/adapters';
import { favoriteOffersDataAction, getCommentsAction, loadOffersAction, loadSingleOfferAction, nearbyOffersDataAction, postReviewAction, redirectToRoute, requireAuthorization, requireLogout, setUserAuthInfo } from './action';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get<Offers>(APIRoute.Offers)
      .then(({ data }) => {
        dispatch(loadOffersAction(adaptOffersBackToFront(data)));
      })
      .catch(() => toast.error(NotificationMessage.OffersError));
  };


export const fetchSingleOfferAction = (id:number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get<Offer>(`${APIRoute.Offers}/${id}`)
      .then(({ data }) => {
        if (!data) {
          dispatch(redirectToRoute(AppRoute.NotFoundOffer));
          return;
        }
        dispatch(loadSingleOfferAction(adaptSingleOfferBackToFront(data)));
      })
      .catch(() => toast.error(NotificationMessage.OfferError));
  };

export const fetchFavoritesOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get<Offers>(APIRoute.Favorites)
      .then(({ data }) => {
        dispatch(favoriteOffersDataAction(adaptOffersBackToFront(data)));
      })
      .catch(() => toast.error(NotificationMessage.ConnecError));
  };

export const fetchNearByOffersAction = (id:number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`)
      .then(({ data }) => {
        dispatch(nearbyOffersDataAction(adaptOffersBackToFront(data)));
      })
      .catch(() => toast.error(NotificationMessage.NearPlacesError));
  };

export const fetchCommentsAction = (id:number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get<Comments>(`${APIRoute.Comments}/${id}`)
      .then(({ data }) => {
        dispatch(getCommentsAction(adaptCommentsBackToFront(data)));
      })
      .catch(() => toast.error(NotificationMessage.CommentsGetErr));
  };

export const postCommentAction = (id:number, {comment, rating}:CommentPost): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.post<Comments>(`${APIRoute.Comments}/${id}`, { comment, rating })
      .then(({ data }) => {
        dispatch(postReviewAction({ comment, rating }));
        dispatch(getCommentsAction(adaptCommentsBackToFront(data)));
      })
      .catch(() => toast.error(NotificationMessage.CommentsPostErr));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then(({status}) => {
        status
        && status !== 401
        && dispatch(requireAuthorization(AuthorizationStatus.Auth))
        && saveAuthStatus(AuthorizationStatus.Auth);
      })
      .catch(() => toast.error(NotificationMessage.ConnecError));
  };

export const loginAction = ({login:email, password}:AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.post<BackAuthInfo>(APIRoute.Login, { email, password })
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

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dropEmail();
    dropAuthStatus();
    dispatch(requireLogout());
    dispatch(redirectToRoute(AppRoute.Login));
  };
