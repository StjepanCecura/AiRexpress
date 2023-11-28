import { ICarousel } from "../interfaces/carousel.interface"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"

const CarouselLayout = ({ carouselData }: { carouselData: ICarousel }) => {
  return (
    <div className="flex justify-center items-center w-full py-8 md:px-80 md:py-8 bg-tetriary">
      <Carousel
        autoPlay
        interval={3000}
        transitionTime={500}
        emulateTouch
        swipeScrollTolerance={5}
        centerSlidePercentage={70}
      >
        {carouselData.images.map((image) => {
          return (
            <div key={image.url}>
              <img src={`https:${image.url}`} />
              <p className="legend">{image.title}</p>
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}

export default CarouselLayout
