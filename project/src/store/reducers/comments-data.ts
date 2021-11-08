import {createReducer} from '@reduxjs/toolkit';
import { CommentsDataType } from '../../types/state';
import { getCommentsAction } from '../action';

const initialState: CommentsDataType = {
  comments: [],
  isDataLoaded: false,
};

const commentsDataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getCommentsAction, (state, action) => {
      state.isDataLoaded = true;
      state.comments = action.payload;
    });
});

export { commentsDataReducer };
