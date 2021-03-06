import { BackOffers, BackOffer } from '../types/backdata-offer';
import { Offers, Offer } from '../types/offer';

export const firstFrontendOffer: Offer = {
  bedrooms: 3,
  city: {
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 10,
    },
    name: 'Amsterdam',
  },
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
  host: {
    avatarUrl: 'img/avatar-angelina.jpg',
    id: 1,
    isPro: true,
    name: 'Milena',
  },
  id: 1,
  images: ['img/apartment-01.jpg', 'img/apartment-02.jpg'],
  isFavorite: true,
  isPremium: true,
  location: {
    latitude: 52.369553943508,
    longitude: 4.85309666406198,
    zoom: 8,
  },
  maxAdults: 4,
  previewImage: 'img/room.jpg',
  price: 99,
  rating: 4.8,
  title: 'Beautiful & luxurious studio at great location',
  type: 'apartment',
};

export const secondFrontendOffer: Offer = {
  bedrooms: 2,
  city: {
    location: {
      latitude: 52.4009553943508,
      longitude: 4.929309666406198,
      zoom: 10,
    },
    name: 'Amsterdam',
  },
  description: 'Picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  goods: ['Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
  host: {
    avatarUrl: 'img/avatar-angelina.jpg',
    id: 2,
    isPro: false,
    name: 'Alice',
  },
  id: 2,
  images: ['img/apartment-02.jpg', 'img/apartment-03.jpg'],
  isFavorite: false,
  isPremium: false,
  location: {
    latitude: 52.3809553943508,
    longitude: 4.939309666406198,
    zoom: 8,
  },
  maxAdults: 3,
  previewImage: 'img/room.jpg',
  price: 100,
  rating: 3.8,
  title: 'Wood and stone place',
  type: 'apartment',
};

export const thirdFrontendOffer: Offer = {
  bedrooms: 4,
  city: {
    location: {
      latitude: 50.935173,
      longitude: 6.953101,
      zoom: 10,
    },
    name: 'Cologne',
  },
  description: 'Cozy that hides behind a a river by the unique lightness of Amsterdam.',
  goods: ['Parking', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
  host: {
    avatarUrl: 'img/avatar-angelina.jpg',
    id: 3,
    isPro: false,
    name: 'Elena',
  },
  id: 3,
  images: ['img/apartment-03.jpg', 'img/apartment-01.jpg'],
  isFavorite: true,
  isPremium: false,
  location: {
    latitude: 52.35414938496378,
    longitude: 4.672877537499948,
    zoom: 8,
  },
  maxAdults: 5,
  previewImage: 'img/room.jpg',
  price: 150,
  rating: 5.0,
  title: 'Canal View Prinsengracht',
  type: 'apartment',
};

export const forthFrontendOffer: Offer = {
  bedrooms: 6,
  city: {
    location: {
      latitude: 52.340216,
      longitude: 4.845168,
      zoom: 10,
    },
    name: 'Amsterdam',
  },
  description: 'Warm that hides behind a a river by the unique lightness of Amsterdam.',
  goods: ['Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
  host: {
    avatarUrl: 'img/avatar-angelina.jpg',
    id: 4,
    isPro: false,
    name: 'Agata',
  },
  id: 4,
  images: ['img/apartment-01.jpg', 'img/apartment-03.jpg'],
  isFavorite: true,
  isPremium: false,
  location: {
    latitude: 52.34414938496378,
    longitude: 4.662877537499948,
    zoom: 8,
  },
  maxAdults: 3,
  previewImage: 'img/room.jpg',
  price: 132,
  rating: 4.8,
  title: 'Nice, cozy, warm big bed apartment',
  type: 'apartment',
};


export const fakeFrontendOffers: Offers = [
  firstFrontendOffer,
  secondFrontendOffer,
  thirdFrontendOffer,
  forthFrontendOffer,
];

export const fakeSortedOffersByPriceUp: Offers = [
  firstFrontendOffer,
  secondFrontendOffer,
  forthFrontendOffer,
  thirdFrontendOffer,
];

export const fakeSortedOffersByPriceDown: Offers = [
  thirdFrontendOffer,
  forthFrontendOffer,
  secondFrontendOffer,
  firstFrontendOffer,
];

export const fakeSortedOffersByTopRated: Offers = [
  thirdFrontendOffer,
  firstFrontendOffer,
  forthFrontendOffer,
  secondFrontendOffer,
];

export const firstBackendOffer: BackOffer = {
  bedrooms: 3,
  city: {
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 10,
    },
    name: 'Amsterdam',
  },
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
  host: {
    'avatar_url': 'img/avatar-angelina.jpg',
    id: 1,
    'is_pro': true,
    name: 'Milena',
  },
  id: 1,
  images: ['img/apartment-01.jpg', 'img/apartment-02.jpg'],
  'is_favorite': true,
  'is_premium': true,
  location: {
    latitude: 52.369553943508,
    longitude: 4.85309666406198,
    zoom: 8,
  },
  'max_adults': 4,
  'preview_image': 'img/room.jpg',
  price: 99,
  rating: 4.8,
  title: 'Beautiful & luxurious studio at great location',
  type: 'apartment',
};

export const secondBackendOffer: BackOffer = {
  bedrooms: 2,
  city: {
    location: {
      latitude: 52.4009553943508,
      longitude: 4.929309666406198,
      zoom: 10,
    },
    name: 'Amsterdam',
  },
  description: 'Picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  goods: ['Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
  host: {
    'avatar_url': 'img/avatar-angelina.jpg',
    id: 2,
    'is_pro': false,
    name: 'Alice',
  },
  id: 2,
  images: ['img/apartment-02.jpg', 'img/apartment-03.jpg'],
  'is_favorite': false,
  'is_premium': false,
  location: {
    latitude: 52.3809553943508,
    longitude: 4.939309666406198,
    zoom: 8,
  },
  'max_adults': 3,
  'preview_image': 'img/room.jpg',
  price: 100,
  rating: 3.8,
  title: 'Wood and stone place',
  type: 'apartment',
};

export const thirdBackendOffer: BackOffer = {
  bedrooms: 4,
  city: {
    location: {
      latitude: 50.935173,
      longitude: 6.953101,
      zoom: 10,
    },
    name: 'Cologne',
  },
  description: 'Cozy that hides behind a a river by the unique lightness of Amsterdam.',
  goods: ['Parking', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
  host: {
    'avatar_url': 'img/avatar-angelina.jpg',
    id: 3,
    'is_pro': false,
    name: 'Elena',
  },
  id: 3,
  images: ['img/apartment-03.jpg', 'img/apartment-01.jpg'],
  'is_favorite': true,
  'is_premium': false,
  location: {
    latitude: 52.35414938496378,
    longitude: 4.672877537499948,
    zoom: 8,
  },
  'max_adults': 5,
  'preview_image': 'img/room.jpg',
  price: 150,
  rating: 5.0,
  title: 'Canal View Prinsengracht',
  type: 'apartment',
};

export const forthBackendOffer: BackOffer = {
  bedrooms: 6,
  city: {
    location: {
      latitude: 52.340216,
      longitude: 4.845168,
      zoom: 10,
    },
    name: 'Amsterdam',
  },
  description: 'Warm that hides behind a a river by the unique lightness of Amsterdam.',
  goods: ['Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
  host: {
    'avatar_url': 'img/avatar-angelina.jpg',
    id: 4,
    'is_pro': false,
    name: 'Agata',
  },
  id: 4,
  images: ['img/apartment-01.jpg', 'img/apartment-03.jpg'],
  'is_favorite': true,
  'is_premium': false,
  location: {
    latitude: 52.34414938496378,
    longitude: 4.662877537499948,
    zoom: 8,
  },
  'max_adults': 3,
  'preview_image': 'img/room.jpg',
  price: 132,
  rating: 4.8,
  title: 'Nice, cozy, warm big bed apartment',
  type: 'apartment',
};

export const fakeBackendOffers:BackOffers = [
  firstBackendOffer,
  secondBackendOffer,
  thirdBackendOffer,
  forthBackendOffer,
];
