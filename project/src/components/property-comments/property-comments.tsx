import { getDateTime, getHumanDate } from '../../utils/utils';
import { Comments } from '../../types/comment-get';

type PropertyCommentsType = {
  comments: Comments;
};

function PropertyComments({ comments }: PropertyCommentsType): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">
                  Reviews &middot;{' '}
        <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {comments.map((comment) => {
          const keyValue = `${comment.id}`;
          return (
            <li key={keyValue} className="reviews__item">
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img
                    className="reviews__avatar user__avatar"
                    src={comment.user.avatarUrl}
                    width="54"
                    height="54"
                    alt="Reviews avatar"
                  />
                </div>
                <span className="reviews__user-name">{comment.user.name}</span>
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span style={{ width: `${comment.rating * 20}%` }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <p className="reviews__text">{comment.comment}</p>
                <time
                  className="reviews__time"
                  dateTime={getDateTime(comment.date)}
                >
                  {getHumanDate(comment.date)}
                </time>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default PropertyComments;
