import {Middleware} from 'redux';
import { ActionType } from '../../types/action';
import browserHistory from '../../browser-history';
import { rootReducer } from '../reducers/root';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === ActionType.RedirectToRoute) {
          browserHistory.push(action.payload);
        }
        return next(action);
      };

