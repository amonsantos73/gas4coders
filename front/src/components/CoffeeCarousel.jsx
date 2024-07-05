import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CoffeeCard from "./CoffeeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const CoffeeCarousel = ({ coffees, userId, favorites }) => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    centerMode: true,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          centerMode: true,
          centerPadding: "0",
        },
      },
    ],
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="col-span-full text-center text-2xl font-bold text-gray-300">Overview</h2>
      <div className="flex justify-center items-center w-full">
        <button
          type="button"
          onClick={() => sliderRef.current.slickPrev()}
          className="text-gray-600 hover:text-red-500 focus:outline-none mr-2"
        >
        </button>
        <div className="w-full max-w-4xl">
          <Slider ref={sliderRef} {...settings} className="text-center">
            {coffees.map((coffee) => (
              <CoffeeCard
                key={coffee._id}
                coffee={coffee}
                isFavorited={favorites.includes(coffee._id)}
                userId={userId}
              />
            ))}
          </Slider>
        </div>
        <button
          type="button"
          onClick={() => sliderRef.current.slickNext()}
          className="text-gray-600 hover:text-red-500 focus:outline-none ml-2"
        >
        </button>
      </div>
    </div>
  );
};

export default CoffeeCarousel;
