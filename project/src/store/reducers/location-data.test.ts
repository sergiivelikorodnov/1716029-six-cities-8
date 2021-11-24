import { DEFAULT_CITY } from '../../consts';
import { fakeFrontendOffers, firstFrontendOffer } from '../../mocks/mock-offers';
import { ActionType } from '../../types/action';
import {  LocationDataType } from '../../types/state';
import { locationDataReducer } from './location-data';

describe('Location Data Reducer', () => {
  it('should get "New City"', () => {
    const state: LocationDataType = {
      currentCity: DEFAULT_CITY,
      currentOffer: firstFrontendOffer,
    };

    const changeCityAction = {
      type: ActionType.ChangeCity,
      payload: 'New City',
    };

    expect(locationDataReducer(state, changeCityAction))
      .toEqual({
        currentCity: 'New City',
        currentOffer: firstFrontendOffer,
      });
  });

  it('should\'t change "Current Offer"', () => {
    const state: LocationDataType = {
      currentCity: DEFAULT_CITY,
      currentOffer: firstFrontendOffer,
    };

    const changeCityAction = {
      type: ActionType.Unknown,
      payload: fakeFrontendOffers[1],
    };

    expect(locationDataReducer(state, changeCityAction))
      .toEqual({
        currentCity: DEFAULT_CITY,
        currentOffer: firstFrontendOffer,
      });
  });

  it('should\'t change "State"', () => {
    const state: LocationDataType = {
      currentCity: DEFAULT_CITY,
      currentOffer: firstFrontendOffer,
    };

    const changeCityAction = {
      type: ActionType.Unknown,
      payload: 'New City',
    };

    expect(locationDataReducer(state, changeCityAction))
      .toEqual({
        currentCity: DEFAULT_CITY,
        currentOffer: firstFrontendOffer,
      });
  });

  it('should get "New Current Offer"', () => {
    const state: LocationDataType = {
      currentCity: DEFAULT_CITY,
      currentOffer: firstFrontendOffer,
    };

    const changeCurrentOfferAction = {
      type: ActionType.LoadSingleOfferData,
      payload: fakeFrontendOffers[2],
    };

    expect(locationDataReducer(state, changeCurrentOfferAction))
      .toEqual({
        currentCity: DEFAULT_CITY,
        currentOffer: fakeFrontendOffers[2],
      });
  });

  it('should\'t get "Wrong Current Offer"', () => {
    const state: LocationDataType = {
      currentCity: DEFAULT_CITY,
      currentOffer: firstFrontendOffer,
    };

    const changeCurrentOfferAction = {
      type: ActionType.LoadSingleOfferData,
      payload: fakeFrontendOffers[2],
    };

    expect(locationDataReducer(state, changeCurrentOfferAction))
      .not.toEqual({
        currentCity: DEFAULT_CITY,
        currentOffer: fakeFrontendOffers[1],
      });
  });

});
