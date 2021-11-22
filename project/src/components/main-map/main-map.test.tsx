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
import MainMap from './main-map';


const history = createMemoryHistory();

const onFakeUnauthorized = jest.fn();
const api = createApi(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore <
    State,
    Action,
    ThunkDispatch< State, typeof api, Action >
  >(middlewares);


describe('Render Main Map', () => {

  it('should render "Main Map" for Home Page correctly', () => {
    const store = mockStore(fakeStateAuth);
    const offers = fakeStateAuth.OFFERS.offers;
    const currentOffer = fakeStateAuth.LOCATION.currentOffer.city;

    render(
      <Provider store ={store}>
        <Router history={history}>
          <MainMap
            offersList= {offers}
            city = {currentOffer}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Leaflet/i)).toBeInTheDocument();
    expect(screen.getByTestId('main-map')).toBeInTheDocument();
  });
});
