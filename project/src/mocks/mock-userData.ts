import { BackAuthInfo, FrontAuthInfo } from '../types/auth-data';

export const userFrontend:FrontAuthInfo = {
  avatarUrl: 'fakeUrl',
  email: 'fakeEmail',
  id: 3,
  isPro: true,
  name: 'fakeName',
};

export const userBackend:BackAuthInfo = {
  'avatar_url': 'fakeUrl',
  email: 'fakeEmail',
  id: 3,
  'is_pro': true,
  name: 'fakeName',
  token: 'secret',

};
