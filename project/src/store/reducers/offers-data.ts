import { createReducer } from '@reduxjs/toolkit';
import { OffersDataType } from '../../types/state';
import {
  favoriteOffersDataAction,
  loadOffersAction,
  nearbyOffersDataAction
} from '../action';

const initialState: OffersDataType = {
  offers: [],
  nearbyOffers: [],
  favoritesOffers: [],
};

const offersDataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffersAction, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(nearbyOffersDataAction, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(favoriteOffersDataAction, (state, action) => {
      state.favoritesOffers = action.payload;
    });
});

export { offersDataReducer };
