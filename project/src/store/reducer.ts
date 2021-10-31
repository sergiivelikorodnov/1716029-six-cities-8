import { AuthorizationStatus, DEFAULT_CITY } from '../consts';
import { ActionType, Actions } from '../types/action';
import { State } from '../types/state';

const initialState = {
  currentCity: DEFAULT_CITY,
  offers: [],
  currentOffer: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  userAuthInfo:null,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return { ...state, currentCity: action.payload };
    case ActionType.LoadOfferData: {
      return { ...state, offers: action.payload, isDataLoaded: true };
    }
    case ActionType.LoadSingleOfferData: {
      return { ...state, currentOffer: action.payload, isDataLoaded: true };
    }
    case ActionType.SelectCity:
      return { ...state, currentOffer: action.payload };
    case ActionType.SetUserAuthInfo:
      return { ...state, userAuthInfo: action.payload };
    case ActionType.RequireAuthorization:
      return { ...state, authorizationStatus: action.payload };
    case ActionType.RequireLogout:
      return { ...state, authorizationStatus: AuthorizationStatus.NoAuth };
    default:
      return state;
  }
};

export { reducer };
