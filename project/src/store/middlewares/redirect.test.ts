import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux';
import { AppRoute } from '../../consts';
import { State } from '../../types/state';
import { redirectToRoute } from '../action';
import { redirect } from './redirect';

const fakeHistory = {
  location: { pathname: '' },
  push(path:string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history.ts', ()=> fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();
const LOSE_PATH = '/lose';

describe('Redirect Middleware test', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });
  it('should be redirected to "/login" url', () => {
    store.dispatch(redirectToRoute(AppRoute.Login));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Login);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Login),
    ]);
  });

  it('should\'t be redirected to "/lose" url', () => {
    store.dispatch({type:'UNKNOWN_ACTION', payload:LOSE_PATH});
    expect(fakeHistory.location.pathname).not.toBe(LOSE_PATH);
  });

});
