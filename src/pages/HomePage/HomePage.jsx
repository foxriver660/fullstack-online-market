import React, { useEffect } from "react";
import { Products } from "../../components/index";
import Slider from "../../components/Slider/Slider";
import classes from "./HomePage.module.scss";
const HomePage = () => {
  const url = window.location.href;
  /*   const scrollToProduct = () => {
    if (url.includes("product")) {
      window.scrollTo({
        top: 1300,
        behavior: "smooth",
      });
    }
  }; 
  useEffect(() => {
    scrollToProduct();
  }, []); */
  return (
    <section>
      {/* <Slider /> */}
      <Products />
    </section>
  );
};

export default HomePage;
