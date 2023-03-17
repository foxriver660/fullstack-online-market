import React from "react";
import classes from "./ProductsFilter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectFilterProducts } from "../../../redux/slice/filterSlice";
import { FILTER_BY_CATEGORY } from "../../../redux/slice/filterSlice";
import { selectProduct } from "../../../redux/slice/productSlice";
const ProductsFilter = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = React.useState("Все");
  const products = useSelector(selectProduct);
  const allCategories = [
    "Все категории",
    ...new Set(products.map((product) => product.category)),
  ];

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, cat }));
  };
  return (
    <div className={classes.filter}>
      <h4 className={classes.title}>Категория</h4>
      <div className={classes.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              className={category === cat ? classes.active : null}
              key={index}
              type="button"
              onClick={() => filterProducts(cat)}
            >
              &#8250; {cat}
            </button>
          );
        })}
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
      <br />
      <button className="--btn --btn-primary">Очистить фильтр</button>
    </div>
  );
};

export default ProductsFilter;
