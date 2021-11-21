import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { fakeStateAuth, fakeStateAuthInProgress } from '../../mocks/mock-store';
import { createApi } from '../../services/api';
import { State } from '../../types/state';
import { Action } from 'redux';
import Favorites from './favorites';

const history = createMemoryHistory();

const onFakeUnauthorized = jest.fn();
const api = createApi(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore <
    State,
    Action,
    ThunkDispatch< State, typeof api, Action >
  >(middlewares);


describe('check Favorites List', () => {

  it('should show Favorites List correctly', () => {
    const store = mockStore(fakeStateAuth);

    render(
      <Provider store ={store}>
        <Router history={history}>
          <Favorites/>
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should show Loader correctly', () => {

    const store = mockStore(fakeStateAuthInProgress);

    render(
      <Provider store ={store}>
        <Router history={history}>
          <Favorites/>
        </Router>
      </Provider>,
    );
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
