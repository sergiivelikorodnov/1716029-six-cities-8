import { fakeFrontendComments } from '../../mocks/mock-comments';
import { ActionType } from '../../types/action';
import { CommentsDataType } from '../../types/state';
import { commentsDataReducer } from './comments-data';

describe('Reducer Get Comments', () => {
  it('should get "Comments"', () => {
    const state: CommentsDataType = {
      comments: [],
    };

    const getCommentsAction = {
      type: ActionType.GetCommentsData,
      payload: fakeFrontendComments,
    };

    expect(commentsDataReducer(state, getCommentsAction))
      .toEqual({
        comments: fakeFrontendComments,
      });
  });

  it('shouldn\'t get "Comments"', () => {
    const state: CommentsDataType = {
      comments: [],
    };

    const getCommentsAction = {
      type: ActionType.Unknown,
      payload: fakeFrontendComments,
    };

    expect(commentsDataReducer(state, getCommentsAction))
      .toEqual({
        comments: [],
      });
  });

});
