import { DEFAULT_CITY } from '../../consts';
import { createReducer } from '@reduxjs/toolkit';
import { changeCityAction, loadSingleOfferAction } from '../action';
import { LocationDataType } from '../../types/state';

const initialState: LocationDataType = {
  currentCity: DEFAULT_CITY,
  currentOffer: null,
};

const locationDataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(loadSingleOfferAction, (state, action) => {
      state.currentOffer = action.payload;
    });
});

export { locationDataReducer };
