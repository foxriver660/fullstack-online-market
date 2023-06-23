import React, { useEffect } from "react";
import { Products } from "../../components/index";
import Slider from "../../components/Slider/Slider";
import classes from "./HomePage.module.scss";
const HomePage = () => {
  const url = window.location.href;
  useEffect(() => {
    const scrollToProducts = () => {
      if (url.includes("#products")) {
        window.scrollTo({
          top: 700,
          behavior: "smooth",
        });
        return;
      }
    };
    scrollToProducts();
  }, [url]);

  return (
    <section>
      <Slider />
      <Products />
    </section>
  );
};

export default HomePage;
