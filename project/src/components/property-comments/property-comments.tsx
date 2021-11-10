import { getDateTime, getHumanDate/* , getSortedCommentsByDate */ } from '../../utils/utils';
import { Comments } from '../../types/comment-get';

type PropertyCommentsType={
  comments: Comments
}

function PropertyComments({ comments} : PropertyCommentsType): JSX.Element {
  if (comments.length > 10) {
    comments = comments.slice(comments.length-10, comments.length);
  }

  // eslint-disable-next-line no-debugger
  //debugger;

  // comments = getSortedCommentsByDate(comments);

  return (
    <>
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
              <span className="reviews__user-name">
                {comment.user.name}
              </span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span
                    style={{ width: `${comment.rating * 20}%` }}
                  >
                  </span>
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
    </>
  );

}

export default PropertyComments;
