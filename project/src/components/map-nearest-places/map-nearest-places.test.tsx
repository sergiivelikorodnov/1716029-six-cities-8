import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router} from 'react-router';
import { fakeStateAuth } from '../../mocks/mock-store';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../../services/api';
import { Provider } from 'react-redux';
import MapNearestPlaces from './map-nearest-places';


const history = createMemoryHistory();

const onFakeUnauthorized = jest.fn();
const api = createApi(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore <
    State,
    Action,
    ThunkDispatch< State, typeof api, Action >
  >(middlewares);


describe('Render Nearest Places Map', () => {

  it('should render "Nearest Places" for Single Offer Page correctly', () => {
    const store = mockStore(fakeStateAuth);
    const offersList = fakeStateAuth.OFFERS.nearbyOffers;
    const city = fakeStateAuth.LOCATION.currentOffer.city;
    const currentOffer = fakeStateAuth.LOCATION.currentOffer;
    const activeOffer = 1;

    render(
      <Provider store ={store}>
        <Router history={history}>
          <MapNearestPlaces
            currentOffer = {currentOffer}
            offersList = {offersList}
            city ={city}
            activeOffer = {activeOffer}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Leaflet/i)).toBeInTheDocument();
    expect(screen.getByTestId('nearest-places-map')).toBeInTheDocument();
  });
});
