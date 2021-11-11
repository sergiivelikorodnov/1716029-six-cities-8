import { AuthorizationStatus } from '../consts';

const AUTH_STATUS_KEY = 'cix-cities-auth';

export type AuthStatus = string;

export const getAuthStatus = (): AuthStatus => {
  const authStatus = localStorage.getItem(AUTH_STATUS_KEY);
  return authStatus || AuthorizationStatus.NoAuth;
};

export const saveAuthStatus = (authStatus: AuthStatus): void => {
  localStorage.setItem(AUTH_STATUS_KEY, authStatus);
};

export const dropAuthStatus = (): void => {
  localStorage.removeItem(AUTH_STATUS_KEY);
};
