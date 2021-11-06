import { FormEvent, useState, ChangeEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH, ratingValues } from '../../consts';
import { postCommentAction } from '../../store/api-actions';
import { ThunkAppDispatch } from '../../types/action';
import { CommentPost } from '../../types/comment-post';
import { State } from '../../types/state';

const mapStateToProps = ({currentOffer}: State) => ({
  currentOffer,
});

const mapDispatchToProps  = (dispatch: ThunkAppDispatch) => ({
  onSubmit(id:number, commentData:CommentPost) {
    dispatch(postCommentAction(id, commentData));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function ReviewsForm({onSubmit, currentOffer}:PropsFromRedux): JSX.Element {
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const { id } = currentOffer;
  const isValidForm = Boolean(
    comment.length < MIN_COMMENT_LENGTH || !rating || rating === 0 || comment.length > MAX_COMMENT_LENGTH,
  );

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        setComment('');
        setRating(0);
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {
          Object.entries(ratingValues).reverse().map(([numberStars, starValue] ) =>
            (
              <>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={numberStars}
                  id={`${numberStars}-stars`}
                  type="radio"
                  readOnly checked = {rating === Number(numberStars)}
                  onInput={() => setRating(Number(numberStars))}
                />
                <label
                  htmlFor={`${numberStars}-stars`}
                  className="reviews__rating-label form__rating-label"
                  title={starValue}
                >
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </>
            ),
          )
        }

        {/*  <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          readOnly checked = {rating === 5}
          onInput={() => setRating(5)}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          readOnly checked = {rating === 4}
          onInput={() => setRating(4)}
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          readOnly checked = {rating === 3}
          onInput={() => setRating(3)}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          readOnly checked = {rating === 2}
          onInput={() => setRating(2)}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          readOnly checked = {rating === 1}
          onInput={() => setRating(1)}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label> */}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => {
          setComment(evt.target.value);
        }}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          onClick = {()=> onSubmit(id,{comment, rating})}
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isValidForm}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export {ReviewsForm};
export default connector(ReviewsForm);
