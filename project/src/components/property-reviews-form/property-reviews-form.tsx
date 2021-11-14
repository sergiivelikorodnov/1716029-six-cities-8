import { AxiosResponse } from 'axios';
import React from 'react';
import { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { api } from '../..';
import {
  APIRoute,
  MAX_COMMENT_LENGTH,
  MIN_COMMENT_LENGTH,
  NotificationMessage,
  ratingValues
} from '../../consts';
import { getCommentsAction } from '../../store/action';
import { getCurrentOffer } from '../../store/selectors';
import { CommentPost } from '../../types/comment-post';
import { adaptCommentsBackToFront } from '../../utils/adapters';

function PropertyReviewsForm(): JSX.Element {
  const currentOffer = useSelector(getCurrentOffer);
  const dispatch = useDispatch();
  const [userComment, setUserComment] = useState<string>('');
  const [userRating, setUserRating] = useState<number>(0);
  const [disabledForm, setDisabledForm] = useState<boolean>(false);

  useEffect(() => {
    if (
      userComment.length < MIN_COMMENT_LENGTH ||
      !userRating ||
      userRating === 0 ||
      userComment.length > MAX_COMMENT_LENGTH
    ) {
      setDisabledForm(true);
    } else {
      setDisabledForm(false);
    }
  }, [userComment, userRating]);
  const { id } = currentOffer;

  const postNewComment = async (
    offerId: number,
    customerComment: CommentPost,
  ): Promise<AxiosResponse> =>
    await api.post(`${APIRoute.Comments}/${offerId}`, customerComment);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const customerReview: CommentPost = {
      comment: userComment,
      rating: userRating,
    };
    setDisabledForm(true);

    postNewComment(id, customerReview)
      .then(({ data }) => {
        dispatch(getCommentsAction(adaptCommentsBackToFront(data)));
        setUserComment('');
        setUserRating(0);
        toast.success(NotificationMessage.CommentsPostSuccess);
      })
      .catch(() => {
        setDisabledForm(false);
        toast.error(NotificationMessage.CommentsPostErr);
      });
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(ratingValues)
          .reverse()
          .map(([numberStars, starValue]) => (
            <React.Fragment key={numberStars}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={numberStars}
                id={`${numberStars}-stars`}
                type="radio"
                readOnly
                checked={userRating === Number(numberStars)}
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
          ))}
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

export default PropertyReviewsForm;
