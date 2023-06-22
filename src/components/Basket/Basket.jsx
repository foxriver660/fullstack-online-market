import React, { useEffect, useState } from "react";
import classes from "./Basket.module.scss";
import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { selectCardTotalQuantity } from "../../redux/slice/cardSlice";
import { useSelector } from "react-redux/es/exports";
const Basket = () => {
  const cartTotalQuantity = useSelector(selectCardTotalQuantity);

  return (
    <span className={classes.cart}>
      <Link className={classes.cartLink} to="/basket">
        Корзина <BsCart4 size={16} />
        <p>{cartTotalQuantity}</p>
      </Link>
    </span>
  );
};

export default Basket;
