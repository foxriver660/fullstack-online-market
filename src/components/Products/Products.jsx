import React, { useEffect, useState } from "react";
import classes from "./Products.module.scss";
import ProductsFilter from "./ProductsFilter/ProductsFilter";
import ProductsList from "./ProductsList/ProductsList";
import useFetchCollection from "../../hook/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { GET_PRICE_RANGE, selectProduct, STORE_PRODUCTS } from "../../redux/slice/productSlice";
import { FaCogs } from "react-icons/fa";
const Products = () => {
  const dispatch = useDispatch();
  const { data } = useFetchCollection("products");
  const [showFilter, setShowFilter] = useState(false);

  const products = useSelector(selectProduct);
  useEffect(() => {
    dispatch(STORE_PRODUCTS(data));
    dispatch(GET_PRICE_RANGE({ products: data }));
  }, [dispatch, data]);

  return (
    <section id="products">
      <div className={`container ${classes.product}`}>
        <aside className={showFilter ? `${classes.show} ${classes.filter}` : classes.filter}>
          <ProductsFilter />
        </aside>
        <div className={classes.content}>
          <ProductsList products={products} />
          <div className={classes.icon} onClick={() => setShowFilter(!showFilter)}>
            <FaCogs size={20} />
            <p>
              <b>{showFilter ? "Скрыть фильтры" : "Показать фильтры"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
