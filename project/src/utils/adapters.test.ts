import { fakeBackendOffers, fakeFrontendOffers } from '../mocks/mock-offers';
import { userBackend, userFrontend } from '../mocks/mock-userData';
import { adaptOffersBackToFront, adaptSingleOfferBackToFront, adaptUserBackToFront } from './adapters';

describe('Test Adapters', () => {

  it('should adapt Offer correctly', () => {
    expect(adaptSingleOfferBackToFront(fakeBackendOffers[0]))
      .toEqual(fakeFrontendOffers[0]);
  });

  it('should adapt Offers correctly', () => {
    expect(adaptOffersBackToFront(fakeBackendOffers))
      .toEqual(fakeFrontendOffers);
  });

  it('should adapt User data correctly', () => {
    expect(adaptUserBackToFront(userBackend))
      .toEqual(userFrontend);
  });

  it('should adapt Comments correctly', () => {
    expect(adaptUserBackToFront(userBackend))
      .toEqual(userFrontend);
  });

});
