import { AuthorizationStatus } from '../consts';
import { fakeFrontendOffers, fakeSortedOffersByPriceDown, fakeSortedOffersByPriceUp, fakeSortedOffersByTopRated, firstFrontendOffer, forthFrontendOffer, secondFrontendOffer, thirdFrontendOffer } from '../mocks/mock-offers';
import { getOffersByCity, getSortedOffersPriceDown, getSortedOffersPriceUp, getSortedOffersTopRated, isLogged } from './utils';

describe('Function: isLogged', () => {

  it('should return "TRUE" when Authorization Status AUTH', () => {
    expect(isLogged(AuthorizationStatus.Auth))
      .toBe(true);
  });

  it('should return "FALSE" when Authorization Status is NoAuth', () => {
    expect(isLogged(AuthorizationStatus.NoAuth))
      .toBe(false);
  });

});


describe('Function: getOffersByCity', () => {
  const CITY = 'Cologne';
  const NEW_CITY = 'Amsterdam';

  it('should return filtered offers by "CITY"', () => {
    expect(getOffersByCity(CITY, fakeFrontendOffers))
      .toEqual([thirdFrontendOffer]);
  });

  it('should return filtered offers by "NEW_CITY"', () => {
    expect(getOffersByCity(NEW_CITY, fakeFrontendOffers))
      .toEqual([
        firstFrontendOffer,
        secondFrontendOffer,
        forthFrontendOffer,
      ]);
  });

});

describe('Function: getSortedOffersPriceUp', () => {
  it('should return filtered offers by "PRICE UP"', () => {
    expect(getSortedOffersPriceUp(fakeFrontendOffers))
      .toEqual(fakeSortedOffersByPriceUp);
  });

});

describe('Function: getSortedOffersPriceDown', () => {
  it('should return filtered offers by "PRICE UP"', () => {
    expect(getSortedOffersPriceDown(fakeFrontendOffers))
      .toEqual(fakeSortedOffersByPriceDown);
  });

});

describe('Function: getSortedOffersTopRated', () => {
  it('should return filtered offers by "Top rated"', () => {
    expect(getSortedOffersTopRated(fakeFrontendOffers))
      .toEqual(fakeSortedOffersByTopRated);
  });

});
