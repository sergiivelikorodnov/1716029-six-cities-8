import { AuthorizationStatus } from '../../consts';
import { FAKE_USER_DATA } from '../../mocks/mock-user';
import { userFrontend } from '../../mocks/mock-userData';
import { ActionType } from '../../types/action';
import { authDataReducer } from './auth-data';

describe('Reducer Auth Data', () => {
  it('without extra parameters should return initial state', () => {
    expect(authDataReducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        userAuthInfo: FAKE_USER_DATA,
      });
  });

  it('should update authorizationStatus to "AUTH"', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userAuthInfo: FAKE_USER_DATA,
    };

    const requiredAuthorizationAction = {
      type: ActionType.RequireAuthorization,
      payload: AuthorizationStatus.Auth,
    };

    expect(authDataReducer(state, requiredAuthorizationAction))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        userAuthInfo: FAKE_USER_DATA,
      });
  });

  it('logout should update authorizationStatus to "NOAUTH"', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      userAuthInfo: FAKE_USER_DATA,
    };

    const requiredAuthorizationAction = {
      type: ActionType.RequireLogout,
    };

    expect(authDataReducer(state, requiredAuthorizationAction))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userAuthInfo: FAKE_USER_DATA,
      });
  });

  it('should set Auth Info to "userAuthInfo"', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      userAuthInfo: FAKE_USER_DATA,
    };

    const setAuthUserAction = {
      type: ActionType.SetUserAuthInfo,
      payload: userFrontend,
    };

    expect(authDataReducer(state, setAuthUserAction))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        userAuthInfo: userFrontend,
      });
  });

  it('shouldn\'t set Auth Info to "userAuthInfo"', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      userAuthInfo: FAKE_USER_DATA,
    };

    const setAuthUserAction = {
      type: ActionType.Unknown,
      payload: userFrontend,
    };

    expect(authDataReducer(state, setAuthUserAction))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        userAuthInfo: FAKE_USER_DATA,
      });
  });
});
