// import { AxiosResponse } from 'axios';
import React from 'react';
import { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { api } from '../..';
import { /* APIRoute, */ MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH, ratingValues } from '../../consts';
// import { postReviewAction } from '../../store/action';
import { postCommentAction } from '../../store/api-actions';
import { getCurrentOffer } from '../../store/selectors';
import { CommentPost } from '../../types/comment-post';

function ReviewsForm(): JSX.Element {
  const currentOffer = useSelector(getCurrentOffer);
  const dispatch = useDispatch();

  const onSubmit = (id:number, commentData:CommentPost) =>{
    dispatch(postCommentAction(id, commentData));
  };

  const [userComment, setUserComment] = useState<string>('');
  const [userRating, setUserRating] = useState<number>(0);
  const [disabledForm, setDisabledForm] = useState<boolean>(false);

  useEffect(() => {
    if (userComment.length < MIN_COMMENT_LENGTH || !userRating || userRating === 0 || userComment.length > MAX_COMMENT_LENGTH) {
      setDisabledForm(true);
    } else {
      setDisabledForm(false);
    }
  }, [userComment,userRating]);
  const { id } = currentOffer;

  /*   const postNewComment = async (offerId:number, {comment, rating}:CommentPost): Promise<AxiosResponse> => (
    await api.post(`${ APIRoute.Comments }/${ offerId }`, comment)
  );

  const handleFormSubmit=(evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    postNewComment(id, { comment: userComment, rating: userRating })
      .then(({ data }) => {
        dispatch(postReviewAction({ comment, rating }));
        dispatch(getCommentsAction(adaptCommentsBackToFront(data)));
        dispatch(postOfferCommentSuccess());

        setUserComment('');
        setUserRating(0);
      });
  }; */


  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        setUserComment('');
        setUserRating(0);

      }}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {
          Object.entries(ratingValues).reverse().map(([numberStars, starValue] ) =>
            (
              <React.Fragment key={numberStars}>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={numberStars}
                  id={`${numberStars}-stars`}
                  type="radio"
                  readOnly checked = {userRating === Number(numberStars)}
                  onInput={() => setUserRating(Number(numberStars))}
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
              </React.Fragment>
            ),
          )
        }

      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={userComment}
        onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => {
          setUserComment(evt.target.value);
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
          onClick={() => { setDisabledForm(false); onSubmit(id,{comment: userComment, rating: userRating});}}
          className="reviews__submit form__submit button"
          type="submit"
          disabled={disabledForm}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
