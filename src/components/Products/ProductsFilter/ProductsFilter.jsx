import React, { useEffect, useState } from "react";
import styles from "./ProductsFilter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_BY_BRAND, FILTER_BY_PRICE, selectFilterProducts } from "../../../redux/slice/filterSlice";
import { FILTER_BY_CATEGORY } from "../../../redux/slice/filterSlice";
import { selectMaxPrice, selectMinPrice, selectProduct } from "../../../redux/slice/productSlice";

const ProductsFilter = () => {
  const dispatch = useDispatch();

  const [category, setCategory] = useState("Все");
  const [brand, setBrand] = useState("Все");
  const [price, setPrice] = useState(0);
  const products = useSelector(selectProduct);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const allCategories = ["Все категории", ...new Set(products.map((product) => product.category))];
  const allBrands = ["Все брэнды", ...new Set(products.map((product) => product.brand))];

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [brand]);
  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [price]);
  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, cat }));
  };
  const clearFilters = () => {
    setCategory("Все");
    setBrand("Все");
    setPrice(maxPrice);
  };

  return (
    <div className={styles.filter}>
      <h4 className={styles.title}>Категория</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              className={category === cat ? styles.active : null}
              key={index}
              type="button"
              onClick={() => filterProducts(cat)}
            >
              &#8250; {cat}
            </button>
          );
        })}
      </div>
      <h4 className={styles.title}>Брэнд</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand, index) => {
            return (
              <option key={index} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
      </div>
      <h4 className={styles.title}>Стоимость</h4>
      {price !== 0 ? <p>{price}</p> : <p>Предпочитаемая цена</p>}

      <input value={price} type="range" min={minPrice} max={maxPrice} onChange={(e) => setPrice(e.target.value)} />

      <br />
      <button className="--btn --btn-primary" onClick={clearFilters}>
        Очистить фильтр
      </button>
    </div>
  );
};

export default ProductsFilter;
