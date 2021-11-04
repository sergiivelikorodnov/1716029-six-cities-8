import { APIRoute, AppRoute, AuthorizationStatus } from '../consts';
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
    const { data } = await api.get<Offers>(APIRoute.Offers);
    dispatch(loadOffersAction(adaptOffersBackToFront(data)));
  };

export const fetchSingleOfferAction = (id:number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
    if (!data) {
      dispatch(redirectToRoute(AppRoute.NotFoundOffer));
      return;
    }

    dispatch(loadSingleOfferAction(adaptSingleOfferBackToFront(data)));
  };

export const fetchFavoritesOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Offers>(APIRoute.Favorites);
    dispatch(favoriteOffersDataAction(adaptOffersBackToFront(data)));
  };

export const fetchNearByOffersAction = (id:number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(nearbyOffersDataAction(adaptOffersBackToFront(data)));
  };

export const fetchCommentsAction = (id:number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Comments>(`${APIRoute.Comments}/${id}`);
    dispatch(getCommentsAction(adaptCommentsBackToFront(data)));
  };

export const postCommentAction = (id:number, {comment, rating}:CommentPost): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.post<Comments>(`${APIRoute.Comments}/${id}`, { comment, rating });
    dispatch(postReviewAction({ comment, rating }));
    dispatch(getCommentsAction(adaptCommentsBackToFront(data)));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then(({status}) => {
        status
        && status !== 401
        && dispatch(requireAuthorization(AuthorizationStatus.Auth))
        && saveAuthStatus(AuthorizationStatus.Auth);
      });
  };

export const loginAction = ({login:email, password}:AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.post<BackAuthInfo>(APIRoute.Login, { email, password });
    saveAuthStatus(AuthorizationStatus.Auth);
    saveToken(data.token);
    saveEmail(data.email);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserAuthInfo(adaptUserBackToFront(data)));
    dispatch(redirectToRoute(AppRoute.Main));
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
