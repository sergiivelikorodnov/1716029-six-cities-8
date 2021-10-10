export type LocationOffer = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type CityOffer = {
  location: LocationOffer;
  name: string;
}

export type HostOffer = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

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
  isPremium: boolean,
  location: LocationOffer;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: PropertyType;
}

export type Offers = Offer[]
