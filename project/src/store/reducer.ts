import { Action, ActionType } from '../types/action';
import { State } from '../types/state';

const initialState = {
  city: 'Amsterdam',
  offers: 'AMSTERDAM_OFFERS',
};

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.ChangeToAmsterdam:
      return { ...state, city: state.city };
    default:
      return state;
  }
};

export { reducer };
