import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, DEFAULT_USER_DATA } from '../../consts';
import { AuthDataType } from '../../types/state';
import {
  requireAuthorization,
  requireLogout,
  setUserAuthInfo
} from '../action';

const initialState: AuthDataType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userAuthInfo: DEFAULT_USER_DATA,
};

const authDataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserAuthInfo, (state, action) => {
      state.userAuthInfo = action.payload;
    });
});

export { authDataReducer };
