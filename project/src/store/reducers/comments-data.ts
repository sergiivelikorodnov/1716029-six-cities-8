import { createReducer } from '@reduxjs/toolkit';
import { CommentsDataType } from '../../types/state';
import { getCommentsAction } from '../action';

const initialState: CommentsDataType = {
  comments: [],
};

const MAX_SINGLE_OFFER_COMMENTS = 10;

const commentsDataReducer = createReducer(initialState, (builder) => {
  builder.addCase(getCommentsAction, (state, action) => {
    state.comments = action.payload;
    state.comments.reverse();
    if (state.comments.length > MAX_SINGLE_OFFER_COMMENTS) {
      state.comments = state.comments.slice(
        state.comments.length - MAX_SINGLE_OFFER_COMMENTS,
        state.comments.length,
      );
    }
  });
});

export { commentsDataReducer };
