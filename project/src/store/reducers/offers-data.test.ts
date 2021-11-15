import { fakeFrontendOffers } from '../../mocks/mock-offers';
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
        payload: fakeFrontendOffers,
      },
    ))
      .toEqual({
        offers: fakeFrontendOffers,
        nearbyOffers: [],
        favoritesOffers: [],
      });
  });

  it('should load "Near By Offers"', () => {
    expect(offersDataReducer(
      initialState,
      {
        type: ActionType.NearbyOffersData,
        payload: fakeFrontendOffers.slice(0,3),
      },
    ))
      .toEqual(
        {
          offers: [],
          nearbyOffers: fakeFrontendOffers.slice(0,3),
          favoritesOffers: [],
        },
      );
  });

  it('should load "Favorites"', () => {
    expect(offersDataReducer(
      initialState,
      {
        type: ActionType.FavoritesOffersData,
        payload: fakeFrontendOffers.slice(0,3),
      },
    ))
      .toEqual(
        {
          offers: [],
          nearbyOffers: [],
          favoritesOffers: fakeFrontendOffers.slice(0,3),
        },
      );
  });

  it('shouldn\'t change State', () => {
    expect(offersDataReducer(
      initialState,
      {
        type: ActionType.Unknown,
        payload: fakeFrontendOffers,
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
