import { APIRoute } from '../consts';
import { ThunkActionResult } from '../types/action';
import { Offers } from '../types/offer';
import { loadOffersAction } from './action';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Offers>(APIRoute.Offers);
    dispatch(loadOffersAction(data));
  };
