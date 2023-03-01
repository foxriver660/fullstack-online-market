import React from "react";
import classes from "./ProductsFilter.module.scss";
const ProductsFilter = () => {
  return (
    <div className={classes.filter}>
      <h4 className={classes.title}>Категория</h4>
      <div className={classes.category}>
        <button className={classes.btn}>Все</button>
      </div>
      <h4 className={classes.title}>Брэнд</h4>
      <div className={classes.brand}>
      <select name="brand">
        <option value="all">Все</option>
      </select>
      </div>
      <h4 className={classes.title}>Стоимость</h4>
      <p>1500</p>
      <div className={classes.price}>
        <input name="price" type="range" min={10000} max={200000} />
      </div>
      <br/>
      <button className="--btn --btn-primary">Очистить фильтр</button>
    </div>
  );
};

export default ProductsFilter;
