import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { AuthorizationStatus } from '../../consts';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fakeBackendOffers } from '../../mocks/mock-offers';
import FavoritesEmpty from './favorites-empty';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  AUTH: { authorizationStatus: AuthorizationStatus.Auth },
  OFFERS: {offers: fakeBackendOffers},
});

describe('Render Not Found Component', () => {

  it('should render correctly', () => {
    render(
      <Provider store ={store}>
        <Router history={history}>
          <FavoritesEmpty />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });

});
