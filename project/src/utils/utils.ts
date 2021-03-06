import dayjs from 'dayjs';
import { AuthorizationStatus, CITIES } from '../consts';
import { Offers } from '../types/offer';

export function getHumanDate(date: string): string {
  return dayjs(date).format('MMMM YYYY');
}

export function getDateTime(date: string): string {
  return dayjs(date).format('YYYY-MM-DD');
}

export function getOffersByCity(currentCity: string, offers: Offers): Offers {
  return offers.filter((offer) => offer.city.name === currentCity);
}

export function getSortedOffersPriceUp(offers: Offers): Offers {
  return offers.slice().sort((offerA, offerB) => offerA.price - offerB.price);
}

export function getSortedOffersPriceDown(offers: Offers): Offers {
  return offers.slice().sort((offerA, offerB) => offerB.price - offerA.price);
}

export function getSortedOffersTopRated(offers: Offers): Offers {
  return offers.slice().sort((offerA, offerB) => offerB.rating - offerA.rating);
}

export const isLogged = (authorizationStatus: AuthorizationStatus): boolean => authorizationStatus === AuthorizationStatus.Auth;

export const getRandomCity = (cities: typeof CITIES): string => cities[Math.floor(Math.random() * cities.length)];


