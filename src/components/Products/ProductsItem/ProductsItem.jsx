import React from "react";
import classes from "./ProductsItem.module.scss";
import Card from "../../Card/Card";
import { Link } from "react-router-dom";
import { ADD_TO_CARD, CALCULATE_TOTAL_QUANTITY } from "../../../redux/slice/cardSlice";
import { useDispatch } from "react-redux";
import { shortenText } from "../../../utils/cutText";

const ProductsItem = ({ grid, product, id, name, price, desc, imageURL }) => {
  const dispatch = useDispatch();

  const addToCard = (product) => {
    dispatch(ADD_TO_CARD(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <Card className={grid ? classes.grid : classes.list}>
      <Link to={`/product-details/${id}`}>
        <div className={classes.img}>
          <img className={classes.img} src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={classes.content}>
        <div className={classes.details}>
          <p>{price} &#8381;</p>
          <h4>{shortenText(name, 15)}</h4>
        </div>
        {!grid && <p className={classes.desc}>{shortenText(desc, 200)}</p>}
        <button type="button" className="--btn --btn-danger" onClick={() => addToCard(product)}>
          Добавить в корзину
        </button>
      </div>
    </Card>
  );
};

export default ProductsItem;
