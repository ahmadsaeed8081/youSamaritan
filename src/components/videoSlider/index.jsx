import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VideoPlayer from "../videoPlayer";

const VideoSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const brands = [
    "video1.mp4",
    "video2.mp4",
    "video3.mp4",

  ];

  return (
    <div className="tw-flex tw-items-center">
      <div className="container tw-mx-auto tw-relative">
        <Slider {...settings}>
          {brands.map((brand, index) => (
            <div key={index} className="tw-text-center tw-rounded-md tw-overflow-hidden">
              <VideoPlayer src={require(`../../assets/images/${brand}`)} className="tw-rounded-md tw-mx-auto" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default VideoSlider;
