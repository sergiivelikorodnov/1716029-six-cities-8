import dayjs from 'dayjs';
import { AuthorizationStatus } from '../consts';
import { BackAuthInfo, FrontAuthInfo } from '../types/auth-data';
import { Offer, Offers } from '../types/offer';

export function getHumanDate(date: string): string {
  return dayjs(date).format('D MMMM YYYY');
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

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean => authorizationStatus === AuthorizationStatus.Unknown;
export const isLogged = (authorizationStatus: AuthorizationStatus): boolean => authorizationStatus === AuthorizationStatus.Auth;

export const adaptOffersBackToFront = (backData: Offers): Offers => {
  const adaptedData = backData.map((item): Offer => (
    Object.assign(
      {},
      item,
      {
        isFavorite: item.is_favorite,
        isPremium: item.is_premium,
        maxAdults: item.max_adults,
        previewImage: item.preview_image,
      },
      {
        host: {
          avatarUrl: item.host.avatar_url,
          id: item.host.id,
          isPro: item.host.is_pro,
          name: item.host.name,
        },
      },
    )
  ));

  adaptedData.forEach((item) => {
    delete item.is_favorite;
    delete item.is_premium;
    delete item.max_adults;
    delete item.preview_image;
    delete item.host.is_pro;
    delete item.host.avatar_url;
  });
  return adaptedData;
};

export const adaptSingleOfferBackToFront = (backData: Offer): Offer => {
  const adaptedData =
    Object.assign(
      {},
      backData,
      {
        isFavorite: backData.is_favorite,
        isPremium: backData.is_premium,
        maxAdults: backData.max_adults,
        previewImage: backData.preview_image,
      },
      {
        host: {
          avatarUrl: backData.host.avatar_url,
          id: backData.host.id,
          isPro: backData.host.is_pro,
          name: backData.host.name,
        },
      },
    );


  delete adaptedData.is_favorite;
  delete adaptedData.is_premium;
  delete adaptedData.max_adults;
  delete adaptedData.preview_image;
  delete adaptedData.host.is_pro;
  delete adaptedData.host.avatar_url;

  return adaptedData;
};

export const adaptUserBackToFront = (backendUserData: BackAuthInfo): FrontAuthInfo => {
  const { email, id, name } = backendUserData;
  return {
    avatarUrl: backendUserData.avatar_url,
    isPro: backendUserData.is_pro,
    email,
    id,
    name,
  };
};
