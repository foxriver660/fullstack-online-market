import React from "react";

import classes from "./Basket.module.scss";
import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { selectBasketTotalQuantity } from "../../redux/slice/basketSlice";
import { useSelector } from "react-redux/es/exports";

const Basket = () => {
  const basketTotalQuantity = useSelector(selectBasketTotalQuantity);

  return (
    <span className={classes.basket}>
      <Link className={classes.basketLink} to="/basket">
        Корзина <BsCart4 size={16} />
        <p>{basketTotalQuantity}</p>
      </Link>
    </span>
  );
};

export default Basket;
