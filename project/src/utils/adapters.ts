import { BackAuthInfo, FrontAuthInfo } from '../types/auth-data';
import { BackOffer, BackOffers } from '../types/backdata-offer';
import { CommentBackendGet, CommentGet, Comments, CommentsBackend } from '../types/comment-get';
import { Offer, Offers } from '../types/offer';

export const adaptOffersBackToFront = (backData: BackOffers): Offers => {
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

export const adaptSingleOfferBackToFront = (backData: BackOffer): Offer => {
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
    ) as Offer;


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


export const adaptCommentsBackToFront = (backData: CommentsBackend): Comments => {
  const adaptedData = backData.map((item: CommentBackendGet): CommentGet => (
    Object.assign(
      {},
      item,
      {
        user: {
          avatarUrl: item.user.avatar_url,
          isPro: item.user.is_pro,
        },
      },
    ) as CommentGet
  ));

  adaptedData.forEach((item) => {
    delete item.user.is_pro;
    delete item.user.avatar_url;
  });
  return adaptedData;
};
