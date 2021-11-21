import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router} from 'react-router';
import MainLocationList from './main-location-list';
import { CITIES } from '../../consts';
import { fakeStateAuth } from '../../mocks/mock-store';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../../services/api';
import { Provider } from 'react-redux';

const history = createMemoryHistory();

const onFakeUnauthorized = jest.fn();
const api = createApi(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore <
    State,
    Action,
    ThunkDispatch< State, typeof api, Action >
  >(middlewares);


describe('Render Location List', () => {

  it('should render "All CITIES" from array correctly', () => {
    const store = mockStore(fakeStateAuth);

    render(
      <Provider store ={store}>
        <Router history={history}>
          <MainLocationList
            cities = {CITIES}
          />
        </Router>
      </Provider>,
    );

    CITIES.forEach((item) =>
      expect(screen.getByText(item)).toBeInTheDocument());
  });


});
