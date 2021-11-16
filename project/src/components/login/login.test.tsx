import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router';
import {  AppRoute, AuthorizationStatus } from '../../consts';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Login from './login';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Render Not Found Component', () => {

  it('should render correctly, if AuthorizationStatus is "NO AUTH" and link on Home Page from "City"', () => {
    const store = mockStore({
      AUTH: { authorizationStatus: AuthorizationStatus.NoAuth },
    });
    history.push('/fake');
    render(
      <Provider store ={store}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.Main} exact>
              <h1>This is main page</h1>
            </Route>
            <Route>
              <Login />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('email'), 'fake.email@gmail.com');
    userEvent.type(screen.getByTestId('password'), '123');

    expect(screen.getByDisplayValue(/fake.email@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123/i)).toBeInTheDocument();

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('city' ));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });

});
