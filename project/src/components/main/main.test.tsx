import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { fakeStateAmsterdamAuth, fakeStateAuth, fakeStateAuthInProgress } from '../../mocks/mock-store';
import { createApi } from '../../services/api';
import { State } from '../../types/state';
import { Action } from 'redux';
import Main from './main';

const history = createMemoryHistory();

const onFakeUnauthorized = jest.fn();
const api = createApi(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore <
    State,
    Action,
    ThunkDispatch< State, typeof api, Action >
  >(middlewares);


describe('check Main page', () => {

  it('should show Empty Main page correctly', () => {
    const store = mockStore(fakeStateAuth);

    render(
      <Provider store ={store}>
        <Router history={history}>
          <Main/>
        </Router>
      </Provider>,
    );
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
    expect(screen.getByText(/Places/i)).toBeInTheDocument();
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });

  it('should show Main page correctly', () => {
    const store = mockStore(fakeStateAmsterdamAuth);

    render(
      <Provider store ={store}>
        <Router history={history}>
          <Main/>
        </Router>
      </Provider>,
    );
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
    expect(screen.getByText(/places to stay in Amsterdam/i)).toBeInTheDocument();
  });

  it('should show Loader correctly', () => {

    const store = mockStore(fakeStateAuthInProgress);

    render(
      <Provider store ={store}>
        <Router history={history}>
          <Main/>
        </Router>
      </Provider>,
    );
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
