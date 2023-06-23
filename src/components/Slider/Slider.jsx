import React, { useEffect } from "react";
import "./Slider.scss";
import { sliderData } from "./slider-data";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const Slider = () => {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const slideLength = sliderData.length - 1;

  // AUTO SLIDE
  const autoScroll = true;
  let interval = 6000;

  useEffect(() => {
    if (autoScroll) {
      setInterval(nextSlide, interval);
    }
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setActiveSlide((prevActiveSlide) => (prevActiveSlide === slideLength ? 0 : prevActiveSlide + 1));
  };
  const prevSlide = () => {
    setActiveSlide((prevActiveSlide) => (prevActiveSlide === 0 ? slideLength : prevActiveSlide - 1));
  };

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
      {sliderData.map((slide, index) => {
        return (
          <div className={index === activeSlide ? "slide active" : "slide"} key={index}>
            {index === activeSlide && (
              <>
                <img className="slide_image" src={slide.image} alt={slide.heading} />
                <div className="content">
                  <h3 className="slide_title">{slide.heading}</h3>
                  <p>{slide.desc}</p>
                  <a className="--btn --btn-primary" href="#products">
                    Начать покупки!
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
