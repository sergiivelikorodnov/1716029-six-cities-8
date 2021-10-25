
import dayjs from 'dayjs';
import { Offers } from '../types/offer';

export function getHumanDate(date: string): string {
  return dayjs(date).format('D MMMM YYYY');
}

export function getDateTime(date: string): string {
  return dayjs(date).format('YYYY-MM-DD');
}

export function getOffersByCity(currentCity: string, offers: Offers): Offers {
  return (offers.filter((offer) => offer.city.name === currentCity));
}
