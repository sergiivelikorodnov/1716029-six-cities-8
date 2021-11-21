
export type CommentGet = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: {
    avatarUrl: string,
    ['avatar_url']?: string,
    id: number,
    isPro: boolean,
    ['is_pro']?: boolean,
    name: string,
  }
}

export type Comments = CommentGet[];

export type CommentBackendGet = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: {
    ['avatar_url']: string,
    id: number,
    ['is_pro']: boolean,
    name: string,
  }
};

export type CommentsBackend = CommentBackendGet[];
