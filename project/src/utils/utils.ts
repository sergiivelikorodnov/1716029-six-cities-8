import dayjs from 'dayjs';
import { AuthorizationStatus } from '../consts';
import { Comments } from '../types/comment-get';
import {  Offers } from '../types/offer';

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
  return offers.slice().sort((offerA, offerB) => offerA.rating - offerB.rating);
}

export function getSortedCommentsByDate(comments: Comments): Comments {
  return comments.sort((offerA, offerB) => dayjs(offerB.date).diff(dayjs(offerA.date)));
}
export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean => authorizationStatus === AuthorizationStatus.Unknown;
export const isLogged = (authorizationStatus: AuthorizationStatus): boolean => authorizationStatus === AuthorizationStatus.Auth;

export const emailValid = (value:string):boolean => /^[a-z0-9][a-z0-9-_\\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(value);
