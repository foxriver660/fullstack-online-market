import React, { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import useFetchCollection from "../../hook/useFetchCollection";
import { ProductsFilter, ProductsList } from "../index";
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
      <div className={`container ${styles.product}`}>
        <aside className={showFilter ? `${styles.show} ${styles.filter}` : styles.filter}>
          <ProductsFilter />
        </aside>
        <div className={styles.content}>
          <ProductsList products={products} />
          <div className={styles.icon} onClick={() => setShowFilter(!showFilter)}>
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
