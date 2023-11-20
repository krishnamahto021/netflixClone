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
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // For medium screens (md)
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // For small screens (sm)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // For extra small screens (xs)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="mb-4">{title}</div>
      <Slider {...settings}>
        {data.map((movie) => (
          <div key={movie.id} >
            <Card movie={movie} />
          </div>
        ))}
      </Slider>

      {/* Custom styles for positioning slick slider arrow buttons */}
      <style>{`
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
