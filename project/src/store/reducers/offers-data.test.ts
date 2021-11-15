import { fakeOffers } from '../../mocks/mock-offers';
import { ActionType } from '../../types/action';
import {  OffersDataType } from '../../types/state';
import { offersDataReducer } from './offers-data';

const initialState: OffersDataType = {
  offers: [],
  nearbyOffers: [],
  favoritesOffers: [],
};

describe('Offers Data Reducer', () => {
  it('should load "All Offers"', () => {

    expect(offersDataReducer(
      initialState,
      {
        type: ActionType.LoadOffersData,
        payload: fakeOffers,
      },
    ))
      .toEqual({
        offers: fakeOffers,
        nearbyOffers: [],
        favoritesOffers: [],
      });
  });

  it('should load "Near By Offers"', () => {
    expect(offersDataReducer(
      initialState,
      {
        type: ActionType.NearbyOffersData,
        payload: fakeOffers.slice(0,3),
      },
    ))
      .toEqual(
        {
          offers: [],
          nearbyOffers: fakeOffers.slice(0,3),
          favoritesOffers: [],
        },
      );
  });

  it('should load "Favorites"', () => {
    expect(offersDataReducer(
      initialState,
      {
        type: ActionType.FavoritesOffersData,
        payload: fakeOffers.slice(0,3),
      },
    ))
      .toEqual(
        {
          offers: [],
          nearbyOffers: [],
          favoritesOffers: fakeOffers.slice(0,3),
        },
      );
  });

  it('shouldn\'t change State', () => {
    expect(offersDataReducer(
      initialState,
      {
        type: ActionType.Unknown,
        payload: fakeOffers,
      },
    ))
      .toEqual(
        {
          offers: [],
          nearbyOffers: [],
          favoritesOffers: [],
        },
      );
  });

});
