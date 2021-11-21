import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { fakeStateAuth } from '../../mocks/mock-store';
import { createApi } from '../../services/api';
import { State } from '../../types/state';
import PropertyReviewsForm from './property-reviews-form';
import { Action } from 'redux';
import userEvent from '@testing-library/user-event';
// import userEvent from '@testing-library/user-event';

const onFakeUnauthorized = jest.fn();
const api = createApi(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore <
    State,
    Action,
    ThunkDispatch< State, typeof api, Action >
  >(middlewares);
const history = createMemoryHistory();


describe('check property reviews form', () => {

  it('should show form correctly', () => {
    const store = mockStore(fakeStateAuth);
    render(
      <Provider store ={store}>
        <Router history={history}>
          <PropertyReviewsForm/>
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('button').textContent).toBe('Submit');

    expect(screen.getByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('review_form'), 'Some review');

    expect(screen.getByText(/Some review/i)).toBeInTheDocument();
  });

});
