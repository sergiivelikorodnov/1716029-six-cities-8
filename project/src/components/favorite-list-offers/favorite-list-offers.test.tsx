import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { fakeStateAuth } from '../../mocks/mock-store';
import { createApi } from '../../services/api';
import { State } from '../../types/state';
import { Action } from 'redux';
import MainListOffers from '../main-list-offers/main-list-offers';

const history = createMemoryHistory();

const onFakeUnauthorized = jest.fn();
const api = createApi(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore <
    State,
    Action,
    ThunkDispatch< State, typeof api, Action >
  >(middlewares);


describe('check Favorites List Offers page', () => {

  it('should show Favorites List Offers correctly', async () => {
    const store = mockStore(fakeStateAuth);
    const offers = fakeStateAuth.OFFERS.offers;

    render(
      <Provider store ={store}>
        <Router history={history}>
          <MainListOffers
            offers = {offers}
          />
        </Router>
      </Provider>,
    );

    await waitFor(() => {
      offers.forEach((item) =>
        expect(screen.getByText(item.title)).toBeInTheDocument());
    });


  });
});
