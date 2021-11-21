export type AuthData = {
  login: string;
  password: string;
};

export type BackAuthInfo = {
  ['avatar_url']: string;
  email: string;
  id: number;
  ['is_pro']: boolean;
  name: string;
  token: string;
};

export type FrontAuthInfo = {
  avatarUrl: string;
  ['avatar_url']?: string;
  email: string;
  id: number;
  isPro: boolean;
  ['is_pro']?: boolean;
  name: string;
};
