import { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import ArrowRight from '../../../assets/ArrowRight.svg'
import Slider from 'react-slick'
import { useWindowDimensions } from '../../../hooks/getWindowDimensions'

const SlickButtonLeft = ({
  currentSlide,
  slideCount,
  children,
  ...props
}: any) => (
  <div className="slider__btn back" {...props}>
    {children}
  </div>
)

const SlickButtonRight = ({
  currentSlide,
  slideCount,
  children,
  ...props
}: any) => (
  <div className="slider__btn next" {...props}>
    {children}
  </div>
)
const CustomSlider = observer(
  ({
    children,
    countItems,
    block,
    slidesToShow,
    slidesToScroll,
    variableWidth = true,
    autoPlay = false,
  }: {
    children: any
    countItems: number
    block?: string
    slidesToShow: number
    slidesToScroll: number
    variableWidth?: boolean
    autoPlay?: boolean
  }) => {
    const [autoPlayStart, setStart] = useState(false)
    const { width } = useWindowDimensions()

    const settings = {
      dots: true,
      speed: 1000,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      arrows: width >= 1024,
      variableWidth: false,
      autoplay: true,
      infinite: true,
      autoplaySpeed: 9000,
      nextArrow: (
        <SlickButtonRight>
          <ArrowRight />
        </SlickButtonRight>
      ),
      prevArrow: (
        <SlickButtonLeft>
          <ArrowRight />
        </SlickButtonLeft>
      ),
    }

    return (
      <section className="slider">
        <div className="slider__list">
          <Slider {...settings}>{children}</Slider>
        </div>
      </section>
    )
  },
)

export default CustomSlider
