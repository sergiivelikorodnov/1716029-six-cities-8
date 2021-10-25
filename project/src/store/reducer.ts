import { DEFAULT_CITY } from '../consts';
import { offers } from '../mocks/offers';
import { ActionType, Actions } from '../types/action';
import { State } from '../types/state';

const initialState = {
  currentCity: DEFAULT_CITY,
  offers: offers,
  currentOffer: null,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return { ...state, currentCity: action.payload };
    case ActionType.LoadOfferData:
      return { ...state, offers: action.payload };
    case ActionType.SelectCity:
      return { ...state, currentOffer: action.payload };
    default:
      return state;
  }
};

export { reducer };
