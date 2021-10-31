import { APIRoute, AppRoute, AuthorizationStatus } from '../consts';
import { dropEmail, saveEmail } from '../services/email';
import { dropToken, saveToken } from '../services/token';
import { ThunkActionResult } from '../types/action';
import { AuthData, BackAuthInfo } from '../types/auth-data';
import { Offer, Offers } from '../types/offer';
import { adaptOffersBackToFront, adaptSingleOfferBackToFront, adaptUserBackToFront } from '../utils/utils';
import { loadOffersAction, loadSingleOfferAction, redirectToRoute, requireAuthorization, requireLogout, setUserAuthInfo } from './action';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Offers>(APIRoute.Offers);
    dispatch(loadOffersAction(adaptOffersBackToFront(data)));
  };

export const fetchSingleOfferAction = (id:number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
    dispatch(loadSingleOfferAction(adaptSingleOfferBackToFront(data)));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then(() => {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      });
  };

export const loginAction = ({login:email, password}:AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.post<BackAuthInfo>(APIRoute.Login, { email, password });

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
    dispatch(requireLogout());
    dispatch(redirectToRoute(AppRoute.Login));
  };
