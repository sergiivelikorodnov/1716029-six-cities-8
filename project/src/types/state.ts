import { AuthorizationStatus } from '../consts';
import { Offer, Offers } from './offer';

export type State = {
  currentCity: string;
  offers: Offers;
  currentOffer: Offer | null;
  authorizationStatus: AuthorizationStatus;
  isDataLoaded: boolean;
}
