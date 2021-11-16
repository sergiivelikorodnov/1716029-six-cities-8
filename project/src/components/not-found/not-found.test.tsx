import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router';
import { AppRoute, AuthorizationStatus } from '../../consts';
import NotFound from './not-found';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fakeBackendOffers } from '../../mocks/mock-offers';

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
          <NotFound />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Oh no, you’ve found junior developer’s homepage!/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Main Page/i })).toBeInTheDocument();
  });

  it('should redirect to main page', () => {
    history.push('/fake');
    render(
      <Provider store ={store}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.Main} exact>
              <h1>This is main page</h1>
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </Provider>,

    );

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link', { name: /Main Page/i }));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });

});
