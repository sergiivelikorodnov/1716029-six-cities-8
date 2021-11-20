import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { fakeStateAuth } from '../../mocks/mock-store';
import { createApi } from '../../services/api';
import { State } from '../../types/state';
import { Action } from 'redux';
import MainCityContainer from './main-city-container';
import { getSortedOffersPriceDown } from '../../utils/utils';
import { SortingType } from '../../consts';
import { fakeSortedOffersByPriceDown } from '../../mocks/mock-offers';

const history = createMemoryHistory();

const onFakeUnauthorized = jest.fn();
const api = createApi(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore <
    State,
    Action,
    ThunkDispatch< State, typeof api, Action >
  >(middlewares);


describe('check Main Container page', () => {

  it('should show Cards on Main page correctly', () => {
    const store = mockStore(fakeStateAuth);
    const offers = fakeStateAuth.OFFERS.offers;
    const selectedSortTypeHandler = jest.fn();
    const sortedOffers = getSortedOffersPriceDown(offers);
    const selectedSorttype = SortingType.PRICE_DOWN;

    render(
      <Provider store ={store}>
        <Router history={history}>
          <MainCityContainer
            selectedSortType = {selectedSorttype}
            selectedSortTypeHandler ={selectedSortTypeHandler}
            sortedOffers = {sortedOffers}
            offersList = {offers}
          />
        </Router>
      </Provider>,
    );


    fakeSortedOffersByPriceDown.forEach((item) =>
      expect(screen.getByText(item.title)).toBeInTheDocument());
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();

  });
});
