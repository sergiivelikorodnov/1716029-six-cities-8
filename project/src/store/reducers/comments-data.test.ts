import { fakeComments } from '../../mocks/mock-comments';
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
      payload: fakeComments,
    };

    expect(commentsDataReducer(state, getCommentsAction))
      .toEqual({
        comments: fakeComments,
      });
  });

  it('shouldn\'t get "Comments"', () => {
    const state: CommentsDataType = {
      comments: [],
    };

    const getCommentsAction = {
      type: ActionType.Unknown,
      payload: fakeComments,
    };

    expect(commentsDataReducer(state, getCommentsAction))
      .toEqual({
        comments: [],
      });
  });

});
