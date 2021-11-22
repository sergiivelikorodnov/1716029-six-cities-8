
import dayjs from 'dayjs';
import { AuthorizationStatus, CITIES } from '../consts';
import { Offers } from '../types/offer';
// import { JSXElementConstructor } from 'react';
// import thunk, { ThunkDispatch } from 'redux-thunk';
// import { configureMockStore } from '@jedmao/redux-mock-store';
// import { fakeState } from '../mocks/mock-store';
// import { createApi } from '../services/api';
// import { State } from '../types/state';
// import { Action } from 'redux';
// import { createMemoryHistory } from 'history';
// import { Router } from 'react-router-dom';
// import { Provider } from 'react-redux';

export function getHumanDate(date: string): string {
  return dayjs(date).format('MMMM YYYY');
}

export function getDateTime(date: string): string {
  return dayjs(date).format('YYYY-MM-DD');
}

export function getOffersByCity(currentCity: string, offers: Offers): Offers {
  return offers.filter((offer) => offer.city.name === currentCity);
}

export function getSortedOffersPriceUp(offers: Offers): Offers {
  return offers.slice().sort((offerA, offerB) => offerA.price - offerB.price);
}

export function getSortedOffersPriceDown(offers: Offers): Offers {
  return offers.slice().sort((offerA, offerB) => offerB.price - offerA.price);
}

export function getSortedOffersTopRated(offers: Offers): Offers {
  return offers.slice().sort((offerA, offerB) => offerB.rating - offerA.rating);
}

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean => authorizationStatus === AuthorizationStatus.Unknown;
export const isLogged = (authorizationStatus: AuthorizationStatus): boolean => authorizationStatus === AuthorizationStatus.Auth;

export const getRandomCity = (cities: typeof CITIES): string => cities[Math.floor(Math.random() * cities.length)];

/* export const wrapProvider = (
  TestComponent: JSXElementConstructor<any>,
  fakeStore: fakeState,
  fakeHistory: ReturnType<typeof createMemoryHistory>,
):JSX.Element => {

  const onFakeUnauthorized = jest.fn();
  const api = createApi(onFakeUnauthorized());
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore <
    State,
    Action,
    ThunkDispatch< State, typeof api, Action >
    >(middlewares);

  const store = mockStore(fakeStore);

  return (
    <Provider store ={store}>
       <Router history={fakeHistory}>
         <TestComponent />
      </Router>
  </Provider>
  );
}; */


