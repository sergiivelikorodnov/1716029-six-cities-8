const AUTH_TOKEN_KEY = 'cix-cities-email';

export type Email = string;

export const getEmail = (): Email => {
  const email = localStorage.getItem(AUTH_TOKEN_KEY);
  return email || '';
};

export const saveEmail = (email: Email): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, email);
};

export const dropEmail = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};
