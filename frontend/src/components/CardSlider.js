import React from "react";
import Card from "./Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardSlider = ({ data, title }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="mb-4">{title}</div>
      <Slider {...settings}>
        {data.map((movie, index) => (
          <div key={movie.id} >
            <Card movie={movie} />
          </div>
        ))}
      </Slider>

      {/* Custom styles for positioning slick slider arrow buttons */}
      <style >{`
        .slick-prev {
          left: 0;
          z-index: 1;
        }

        .slick-next {
          right: 0;
          z-index: 1;
        }
      `}</style>
    </div>
  );
};

export default CardSlider;
