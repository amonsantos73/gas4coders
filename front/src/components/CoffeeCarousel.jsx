import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CoffeeCard from './CoffeeCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const CoffeeCarousel = ({ coffees }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    centerMode: true,
    centerPadding: '0',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true,
          centerPadding: '0'
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          centerMode: true,
          centerPadding: '0'
        }
      }
    ]
  };

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div className="absolute top-0 bottom-0 right-0 flex items-center">
        <button
          type="button"
          onClick={onClick} // Passa o onClick diretamente para o botão
          className="text-gray-600 hover:text-red-500 focus:outline-none"
        >
          <FontAwesomeIcon icon={faArrowRight} className="text-2xl" />
        </button>
      </div>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="absolute top-0 bottom-0 left-0 flex items-center">
        <button
          type="button"
          onClick={onClick} // Passa o onClick diretamente para o botão
          className="text-gray-600 hover:text-red-500 focus:outline-none"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-2xl" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl">
        <Slider {...settings} className="text-center">
          {coffees.map(coffee => (
            <div key={coffee._id} className="px-2 h-96">
              <CoffeeCard coffee={coffee} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CoffeeCarousel;
