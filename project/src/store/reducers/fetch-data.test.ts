import { FetchStatus } from '../../consts';
import { ActionType } from '../../types/action';
import { FetchStatusType } from '../../types/state';
import { fetchStatusReducer } from './fetch-status';

describe('Reducer Fetch Status', () => {
  it('should update fetch status to "Success"', () => {
    const state: FetchStatusType = {
      fetchStatus: FetchStatus.InProgress,
    };

    const fetchStatusAction = {
      type: ActionType.SetFetchStatusData,
      payload: FetchStatus.Success,
    };

    expect(fetchStatusReducer(state, fetchStatusAction))
      .toEqual({
        fetchStatus: FetchStatus.Success,
      });
  });

  it('shouldn\'t update fetch status to "Success"', () => {
    const state: FetchStatusType = {
      fetchStatus: FetchStatus.InProgress,
    };

    const fetchStatusAction = {
      type: ActionType.Unknown,
      payload: FetchStatus.Success,
    };

    expect(fetchStatusReducer(state, fetchStatusAction))
      .toEqual({
        fetchStatus: FetchStatus.InProgress,
      });
  });

});
