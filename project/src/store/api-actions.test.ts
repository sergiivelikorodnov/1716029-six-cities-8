import { createApi } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from 'redux';
import { APIRoute, AppRoute, AuthorizationStatus, FetchStatus  } from '../consts';

import { checkAuthAction, fetchCommentsAction, fetchFavoritesOffersAction, fetchNearByOffersAction, fetchOffersAction, fetchSingleOfferAction, loginAction, logoutAction } from './api-actions';
import { favoriteOffersDataAction, getCommentsAction, loadOffersAction, loadSingleOfferAction, nearbyOffersDataAction, redirectToRoute, requireAuthorization, requireLogout, setFetchStatusAction, setUserAuthInfo } from './action';
import { AuthData } from '../types/auth-data';
import { userBackend, userFrontend } from '../mocks/mock-userData';
import { fakeFrontendComments } from '../mocks/mock-comments';
import { adaptCommentsBackToFront, adaptOffersBackToFront, adaptSingleOfferBackToFront } from '../utils/adapters';
import { fakeFrontendOffers } from '../mocks/mock-offers';

describe('Async Api Actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createApi(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore <
    State,
    Action,
    ThunkDispatch< State, typeof api, Action >
    >(middlewares);

  it('should AuthStatus is "AUTH" when server returns 200', async() => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);
    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions())
      .toEqual([requireAuthorization(AuthorizationStatus.Auth),
      ]);
  });

  it('should AuthStatus is "NoAUTH" when server returns 401', async() => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(401, []);
    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions())
      .toEqual([requireAuthorization(AuthorizationStatus.NoAuth),
      ]);
  });

  it('should dispatch requireAuthorization, setUserAuthInfo and redirectToRoute when Login', async() => {
    const fakeUser: AuthData = { login:'fakeEmail', password: '12345'};
    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, userBackend);


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    expect(store.getActions())
      .toEqual([
        requireAuthorization(AuthorizationStatus.Auth),
        setUserAuthInfo(userFrontend),
        redirectToRoute(AppRoute.Main),
      ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(3);
    expect(Storage.prototype.setItem).toBeCalledWith('cix-cities-auth', 'AUTH');
    expect(Storage.prototype.setItem).toBeCalledWith('cix-cities', 'secret');
    expect(Storage.prototype.setItem).toBeCalledWith('cix-cities-email', 'fakeEmail');
  });

  it('should get Comments when server returns 200', async() => {
    const fakeId = 1;

    mockAPI
      .onGet(`${APIRoute.Comments}/${fakeId}`)
      .reply(200, fakeFrontendComments );

    const store = mockStore();
    await store.dispatch(fetchCommentsAction(fakeId));

    expect(store.getActions())
      .toEqual([getCommentsAction(adaptCommentsBackToFront(fakeFrontendComments)),
      ]);
  });

  it('should get All Offers when server returns 200', async() => {

    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, fakeFrontendOffers );

    const store = mockStore();
    await store.dispatch(fetchOffersAction());

    expect(store.getActions())
      .toEqual([
        setFetchStatusAction(FetchStatus.InProgress),
        loadOffersAction(adaptOffersBackToFront(fakeFrontendOffers)),
        setFetchStatusAction(FetchStatus.Success),
      ]);
  });

  it('should get Single Offer when server returns 200', async() => {
    const fakeId = 1;

    mockAPI
      .onGet(`${APIRoute.Offers}/${fakeId}`)
      .reply(200, fakeFrontendOffers[fakeId] );

    const store = mockStore();
    await store.dispatch(fetchSingleOfferAction(fakeId));

    expect(store.getActions())
      .toEqual([loadSingleOfferAction(adaptSingleOfferBackToFront(fakeFrontendOffers[fakeId])),
      ]);
  });

  it('should get favorites Offers when server returns 200', async() => {
    mockAPI
      .onGet(APIRoute.Favorites)
      .reply(200, fakeFrontendOffers);

    const store = mockStore();
    await store.dispatch(fetchFavoritesOffersAction());

    expect(store.getActions())
      .toEqual([
        setFetchStatusAction(FetchStatus.InProgress),
        favoriteOffersDataAction(adaptOffersBackToFront(fakeFrontendOffers)),
        setFetchStatusAction(FetchStatus.Success),
      ]);
  });

  it('should get Near By Offers when server returns 200', async() => {
    const fakeId = 2;

    mockAPI
      .onGet(`${APIRoute.Offers}/${fakeId}/nearby`)
      .reply(200, fakeFrontendOffers );

    const store = mockStore();
    await store.dispatch(fetchNearByOffersAction(fakeId));

    expect(store.getActions())
      .toEqual([nearbyOffersDataAction(adaptOffersBackToFront(fakeFrontendOffers)),
      ]);
  });

  it('should Logout when server returns 200', async() => {

    mockAPI
      .onGet(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    expect(store.getActions())
      .toEqual([
        requireLogout(),
        redirectToRoute(AppRoute.Login),
      ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(3);
    expect(Storage.prototype.removeItem).toBeCalledWith('cix-cities-auth');
    expect(Storage.prototype.removeItem).toBeCalledWith('cix-cities');
    expect(Storage.prototype.removeItem).toBeCalledWith('cix-cities-email');
  });

});


