import { HostOffer } from './offer';

export type CommentGet = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: HostOffer;
};

export type Comments = CommentGet[];
