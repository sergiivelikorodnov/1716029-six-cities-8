import { DEFAULT_CITY } from '../consts';
import { offers } from '../mocks/offers';
import { ActionType, ActionTypes } from '../types/action';
import { Offers } from '../types/offer';
import { State } from '../types/state';

const defaultOffers:Offers = offers.filter((offer) => offer.city.name === DEFAULT_CITY);

const initialState = {
  city: DEFAULT_CITY,
  offers: defaultOffers,
};

const reducer = (state: State = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return { ...state, city: state.city };
    default:
      return state;
  }
};

export { reducer };
