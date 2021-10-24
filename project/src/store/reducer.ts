import { DEFAULT_CITY } from '../consts';
import { offers } from '../mocks/offers';
import { ActionType, Actions } from '../types/action';
import { Offers } from '../types/offer';
import { State } from '../types/state';
import { getOffersByCity } from '../utils/utils';

const defaultOffers: Offers = getOffersByCity(DEFAULT_CITY, offers);

const initialState = {
  currentCity: DEFAULT_CITY,
  offers: defaultOffers,
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
