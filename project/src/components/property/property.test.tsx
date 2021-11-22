import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router} from 'react-router';
import { fakeStateAuth, fakeStateNoAuth } from '../../mocks/mock-store';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../../services/api';
import { Provider } from 'react-redux';
import Property from '../../components/property/property';


const history = createMemoryHistory();

const onFakeUnauthorized = jest.fn();
const api = createApi(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore <
    State,
    Action,
    ThunkDispatch< State, typeof api, Action >
  >(middlewares);


describe('Render Property with "AUTH"', () => {

  const store = mockStore(fakeStateAuth);

  const fakeApp =(
    <Provider store ={store}>
      <Router history={history}>
        <Property />
      </Router>
    </Provider>
  );


  it('should render "SIGN OUT" correctly', () => {
    render(fakeApp);
    expect(screen.getByText(/Sign Out/i)).toBeInTheDocument();
  });

  it('should render "GALLERY" correctly', () => {
    render(fakeApp);
    screen.getByTestId('gallery')
      .classList.contains('property__gallery-container container');
  });

  it('should render "TITLE" correctly', () => {
    render(fakeApp);
    screen.getByTestId('title')
      .classList.contains('property__name');
  });

  it('should render "FAVORITE" button correctly', () => {
    render(fakeApp);
    screen.getByTestId('favorite-button')
      .classList.contains('property__bookmark-button');
  });

  it('should render "DESCRIPTION" correctly', () => {
    render(fakeApp);
    screen.getByTestId('description')
      .classList.contains('property__description');
  });

  it('should render "Price" correctly', () => {
    render(fakeApp);
    screen.getByTestId('price')
      .classList.contains('property__price');
  });

  it('should render "REVIEWS" correctly', () => {
    render(fakeApp);
    screen.getByTestId('reviews')
      .classList.contains('property__reviews');
  });

  it('should render "MAP" correctly', () => {
    render(fakeApp);
    expect(screen.getByText(/Leaflet/i)).toBeInTheDocument();
  });

  it('should render "REVIEWS FORM" correctly', () => {
    render(fakeApp);
    expect(screen.getByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i)).toBeInTheDocument();
  });


  it('should render "RELEATED OFFERS" correctly', () => {
    render(fakeApp);
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });
});


describe('Render Property with "NOAUTH"', () => {

  const store = mockStore(fakeStateNoAuth);

  const fakeApp =(
    <Provider store ={store}>
      <Router history={history}>
        <Property />
      </Router>
    </Provider>
  );


  it('should render "SIGN OUT" correctly', () => {
    render(fakeApp);
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  it('should render "GALLERY" correctly', () => {
    render(fakeApp);
    screen.getByTestId('gallery')
      .classList.contains('property__gallery-container container');
  });

  it('should render "TITLE" correctly', () => {
    render(fakeApp);
    screen.getByTestId('title')
      .classList.contains('property__name');
  });

  it('should render "FAVORITE" button correctly', () => {
    render(fakeApp);
    screen.getByTestId('favorite-button')
      .classList.contains('property__bookmark-button');
  });

  it('should render "DESCRIPTION" correctly', () => {
    render(fakeApp);
    screen.getByTestId('description')
      .classList.contains('property__description');
  });

  it('should render "Price" correctly', () => {
    render(fakeApp);
    screen.getByTestId('price')
      .classList.contains('property__price');
  });

  it('should render "REVIEWS" correctly', () => {
    render(fakeApp);
    screen.getByTestId('reviews')
      .classList.contains('property__reviews');
  });

  it('should render "MAP" correctly', () => {
    render(fakeApp);
    expect(screen.getByText(/Leaflet/i)).toBeInTheDocument();
  });

  it('should render "REVIEWS FORM" correctly', () => {
    render(fakeApp);
    expect(screen.queryByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i)).not.toBeInTheDocument();
  });


  it('should render "RELEATED OFFERS" correctly', () => {
    render(fakeApp);
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });
});
