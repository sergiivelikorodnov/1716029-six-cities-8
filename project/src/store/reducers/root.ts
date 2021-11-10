import {combineReducers} from 'redux';
import { authDataReducer } from './auth-data';
import { commentsDataReducer } from './comments-data';
import { setFetchStatusReducer } from './fetch-status';
import { locationDataReducer } from './location-data';
import { offersDataReducer } from './offers-data';

export enum NameSpace{
  offers = 'OFFERS',
  auth = 'AUTH',
  location = 'LOCATION',
  comments = 'COMMENTS',
  status = 'FETCH_STATUS'
}

export const rootReducer = combineReducers({
  [NameSpace.offers]: offersDataReducer,
  [NameSpace.auth]: authDataReducer,
  [NameSpace.location]: locationDataReducer,
  [NameSpace.comments]: commentsDataReducer,
  [NameSpace.status]: setFetchStatusReducer,
});

export type RootState = ReturnType <typeof rootReducer>
