import { observer } from 'mobx-react'
import GlobalState from '../../../stores/GlobalState'
import BlueStar from '../../../assets/ex/star.svg'
import ReviewIcon from '../../../assets/reviews-mobile.svg'
import { useContentState } from '../../../hooks/RootStoreProvider'
const ReviewWidget = observer(() => {
  const getStars = (count: number) => {
    if (!count) return new Array(Math.ceil(5)).fill(0, 0)
    return new Array(Math.ceil(count)).fill(0, 0)
  } // delay-2s

  // const { reviewIO } = useContentState()
  const reviewIO = GlobalState.rating
  return (
    <a
      rel="noreferrer"
      href="https://www.reviews.co.uk/company-reviews/store/phinity-therapy?utm_source=phinity-therapy&utm_medium=widget&utm_campaign=text-banner"
      target={'_blank'}
      className=" intro__widget"
    >
      <div className="intro__widget-col">
        <div className="intro__widget-stars">
          <ReviewIcon className="intro__widget-icon" />
          {reviewIO &&
            getStars(reviewIO?.average_rating).map((s, i) => (
              <BlueStar key={i} className="intro__widget-star" />
            ))}
        </div>
        <span>
          Read our{' '}
          <span className="intro__widget-count">
            {reviewIO ? reviewIO?.num_ratings : ''}
          </span>
          {reviewIO?.num_ratings > 1 || !reviewIO?.num_ratings
            ? 'reviews'
            : 'review'}{' '}
        </span>
      </div>
    </a>
  )
})

export default ReviewWidget
