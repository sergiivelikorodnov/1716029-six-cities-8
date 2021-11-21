export type LocationBackOffer = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type CityBackOffer = {
  location: LocationBackOffer;
  name: string;
};

export type HostBackOffer = {
  ['avatar_url']: string;
  id: number;
  ['is_pro']: boolean;
  name: string;
};

export type PropertyType = 'apartment' | 'room ' | 'house' | 'hotel';

export type BackOffer = {
  bedrooms: number;
  city: CityBackOffer;
  description: string;
  goods: string[];
  host: HostBackOffer;
  id: number;
  images: string[];
  ['is_favorite']: boolean;
  ['is_premium']: boolean;
  location: LocationBackOffer;
  ['max_adults']: number;
  ['preview_image']: string;
  price: number;
  rating: number;
  title: string;
  type: PropertyType;
};

export type BackOffers = BackOffer[];
