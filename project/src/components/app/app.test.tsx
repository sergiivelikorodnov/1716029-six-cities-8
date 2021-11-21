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
import App from './app';
import { AppRoute } from '../../consts';


const history = createMemoryHistory();

const onFakeUnauthorized = jest.fn();
const api = createApi(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore <
    State,
    Action,
    ThunkDispatch< State, typeof api, Action >
  >(middlewares);


describe('Render App with AUTH', () => {

  const store = mockStore(fakeStateAuth);

  const fakeApp =(
    <Provider store ={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );

  it('should render "Main" correctly', () => {
    history.push(AppRoute.Main);
    render(fakeApp);
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });

  it('should render "Favorites" correctly', () => {
    history.push(AppRoute.Favorites);

    render(fakeApp);
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render "Single Offer id:1" correctly', () => {
    history.push(`${AppRoute.Room}/1`);

    render(fakeApp);
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

});
