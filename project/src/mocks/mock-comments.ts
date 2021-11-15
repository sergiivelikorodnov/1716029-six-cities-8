import { Comments } from '../types/comment-get';

export const fakeFrontComments: Comments = [
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2019-05-08T14:13:56.569Z',
    id: 1,
    rating: 4,
    user: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 1,
      isPro: false,
      name: 'Max',
    },
  },

  {
    comment: 'Cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2021-04-08T14:13:56.569Z',
    id: 2,
    rating: 2,
    user: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 2,
      isPro: false,
      name: 'Agata',
    },
  },

  {
    comment: 'Picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2021-05-08T14:13:56.569Z',
    id: 3,
    rating: 3,
    user: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 3,
      isPro: false,
      name: 'Agata',
    },
  },
];
