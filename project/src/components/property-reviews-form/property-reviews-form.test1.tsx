import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { AuthorizationStatus } from '../../consts';
import { fakeBackendOffers } from '../../mocks/mock-offers';
import PropertyReviewsForm from './property-reviews-form';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  AUTH: { authorizationStatus: AuthorizationStatus.Auth },
  OFFERS: {offers: fakeBackendOffers},
});
describe('check property reviews form', () => {

  it('should show form correctly', () => {
    render(
      <Provider store ={store}>
        <Router history={history}>
          <PropertyReviewsForm/>
        </Router>
      </Provider>,
    );

    //expect(screen.getByText(/Submit/i)).toBeInTheDocument();

  });

});
