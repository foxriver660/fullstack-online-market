import React from "react";
import "./Slider.scss";
import { sliderData } from "./slider-data";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const Slider = () => {
  const [activeSlide, setActiveSlide] = React.useState(0);
const slideLength = sliderData.length;
console.log(slideLength);

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" />
      <AiOutlineArrowRight className="arrow next" />
      {sliderData.map((slide, index) => {
        return (
          <div
            className={index === activeSlide ? "slide active" : "slide"}
            key={index}
          >
            {index === activeSlide && (
              <>
                <img src={slide.image} alt={slide.heading} />
                <div className="content"><h3>{slide.heading}</h3>
                <p>{slide.desc}</p>
                 <a className="--btn --btn-primary" href="#products">Начать покупки!</a>
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
