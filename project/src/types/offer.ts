export type LocationOffer = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type CityOffer = {
  location: LocationOffer;
  name: string;
};

export type HostOffer = {
  avatarUrl: string;
  ['avatar_url']?: string;
  id: number;
  isPro: boolean;
  ['is_pro']?: boolean;
  name: string;
};

export type PropertyType = 'apartment' | 'room ' | 'house' | 'hotel';

export type Offer = {
  bedrooms: number;
  city: CityOffer;
  description: string;
  goods: string[];
  host: HostOffer;
  id: number;
  images: string[];
  isFavorite: boolean;
  ['is_favorite']?: boolean;
  isPremium: boolean;
  ['is_premium']?: boolean;
  location: LocationOffer;
  maxAdults: number;
  ['max_adults']?: number;
  previewImage: string;
  ['preview_image']?: string;
  price: number;
  rating: number;
  title: string;
  type: PropertyType;
};

export type Offers = Offer[];
