import { createReducer } from '@reduxjs/toolkit';
import { FetchStatus } from '../../consts';
import { FetchStatusType } from '../../types/state';
import { setFetchStatusAction } from '../action';

const initialState: FetchStatusType = {
  fetchStatus: FetchStatus.InProgress,
};

const setFetchStatusReducer = createReducer(initialState, (builder) => {
  builder.addCase(setFetchStatusAction, (state, action) => {
    state.fetchStatus = action.payload;
  });
});

export { setFetchStatusReducer };
