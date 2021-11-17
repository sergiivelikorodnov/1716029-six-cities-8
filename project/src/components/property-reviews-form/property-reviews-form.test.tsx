/* import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { fakeStateNoAuth } from '../../mocks/mock-store';
import { createApi } from '../../services/api';
import { State } from '../../types/state';
import PropertyReviewsForm from './property-reviews-form';
import { Action } from 'redux';

const history = createMemoryHistory();

const onFakeUnauthorized = jest.fn();
const api = createApi(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore <
    State,
    Action,
    ThunkDispatch< State, typeof api, Action >
  >(middlewares);

const store = mockStore(fakeStateNoAuth);
describe('check property reviews form', () => {

  it('should show form correctly', () => {
    render(
      <Provider store ={store}>
        <Router history={history}>
          <PropertyReviewsForm/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Submit/i)).toBeInTheDocument();

  });

});
 */

import {configureMockStore} from '@jedmao/redux-mock-store';
import {screen, render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import { fakeStateAuth } from '../../mocks/mock-store';
import PropertyReviewsForm from './property-reviews-form';

const mockStore = configureMockStore();

const store = mockStore(fakeStateAuth);

const history = createMemoryHistory();
describe('Component: UserCommentForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <PropertyReviewsForm />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('button').textContent).toBe('Submit');
  });
});
