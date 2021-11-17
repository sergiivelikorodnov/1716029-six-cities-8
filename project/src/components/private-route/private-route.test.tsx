import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Route, Router, Switch} from 'react-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import PrivateRoute from './private-route';
import { createApi } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../../types/state';
import { Action } from 'redux';
import { fakeStateNoAuth } from '../../mocks/mock-store';


const history = createMemoryHistory();

const onFakeUnauthorized = jest.fn();
const api = createApi(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore <
    State,
    Action,
    ThunkDispatch< State, typeof api, Action >
  >(middlewares);

describe('Checking "Private Route"', () => {
  beforeEach(() => {
    history.push('/private');
  });

  it('should render component for public route, when user not authorized', () => {
    const store = mockStore(fakeStateNoAuth);

    render(
      <Provider store={store}>
        <Switch>
          <Router history={history}>
            <Route exact path="/login">
              <h1>Public Route</h1>
            </Route>
            <PrivateRoute
              exact
              path="/private"
              render = {()=>(<h1>Private Route</h1>)}
            />
          </Router>
        </Switch>
      </Provider>,
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
  });

});
