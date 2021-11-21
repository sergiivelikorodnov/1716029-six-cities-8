import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router} from 'react-router';
import { SortingType } from '../../consts';
import { fakeStateAuth } from '../../mocks/mock-store';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../../services/api';
import { Provider } from 'react-redux';
import MainSortingList from './main-sorting-list';


const history = createMemoryHistory();

const onFakeUnauthorized = jest.fn();
const api = createApi(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore <
    State,
    Action,
    ThunkDispatch< State, typeof api, Action >
  >(middlewares);


describe('Render Main Sorting List', () => {

  it('should render "Main Sorting List" from array correctly', () => {
    const store = mockStore(fakeStateAuth);
    const selectedSortTypeHandler = jest.fn();
    const NUMBER_CALL = 2;

    render(
      <Provider store ={store}>
        <Router history={history}>
          <MainSortingList
            selectedSortType= {SortingType.PRICE_UP}
            selectedSortTypeHandler = {selectedSortTypeHandler}
          />
        </Router>
      </Provider>,
    );


    expect(screen.queryAllByText(/Price: low to high/i).length).toBe(NUMBER_CALL);
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
  });


});
