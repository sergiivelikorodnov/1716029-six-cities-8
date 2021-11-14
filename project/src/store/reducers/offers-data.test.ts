import { offers } from '../../mocks/mock-offers';
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
        payload: offers,
      },
    ))
      .toEqual({
        offers: offers,
        nearbyOffers: [],
        favoritesOffers: [],
      });
  });

  it('should load "Near By Offers"', () => {
    expect(offersDataReducer(
      initialState,
      {
        type: ActionType.NearbyOffersData,
        payload: offers.slice(0,3),
      },
    ))
      .toEqual(
        {
          offers: [],
          nearbyOffers: offers.slice(0,3),
          favoritesOffers: [],
        },
      );
  });

  it('should load "Favorites"', () => {
    expect(offersDataReducer(
      initialState,
      {
        type: ActionType.FavoritesOffersData,
        payload: offers.slice(0,3),
      },
    ))
      .toEqual(
        {
          offers: [],
          nearbyOffers: [],
          favoritesOffers: offers.slice(0,3),
        },
      );
  });

  it('shouldn\'t change State', () => {
    expect(offersDataReducer(
      initialState,
      {
        type: ActionType.Unknown,
        payload: offers,
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
