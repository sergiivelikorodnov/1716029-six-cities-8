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
import { firstFrontendOffer } from '../../mocks/mock-offers';
import PropertyCartOffer from './property-cart-offer';

const history = createMemoryHistory();

const onFakeUnauthorized = jest.fn();
const api = createApi(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore <
    State,
    Action,
    ThunkDispatch< State, typeof api, Action >
  >(middlewares);

const store = mockStore(fakeStateAuth);
describe('check Single Property Cart Offer', () => {
  const fakeHandlerState = jest.fn();

  it('should show Single Property correctly', () => {
    render(
      <Provider store ={store}>
        <Router history={history}>
          <PropertyCartOffer offer={firstFrontendOffer} onHoverOfferHandler={fakeHandlerState}/>
        </Router>
      </Provider>,
    );
    const { title, price } = firstFrontendOffer;
    expect(screen.getByAltText(`${title}`)).toBeInTheDocument();
    expect(screen.getByText(`€${price}`)).toBeInTheDocument();
    expect(screen.getByText(`${title}`)).toBeInTheDocument();
  });

});
