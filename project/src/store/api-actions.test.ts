import { createApi } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from 'redux';
import { APIRoute, AppRoute, AuthorizationStatus  } from '../consts';

import { checkAuthAction, loginAction } from './api-actions';
import { redirectToRoute, requireAuthorization, setUserAuthInfo } from './action';
import { AuthData } from '../types/auth-data';
import { userBackend, userFrontend } from '../mocks/mock-userData';

describe('Async Api Actions', () => {
  const fakeHistory = {
    location: {
      pathname: '',
    },
    push: (path: string): void => {
      fakeHistory.location.pathname = path;
    },
  };

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

});


