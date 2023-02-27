import React, { useEffect } from "react";
import classes from "./Products.module.scss";
import ProductsFilter from "./ProductsFilter/ProductsFilter";
import ProductsList from "./ProductsList/ProductsList";
import useFetchCollection from "../../hook/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, STORE_PRODUCTS } from "../../redux/slice/productSlice";
const Products = () => {
  const dispatch = useDispatch();

  const { data, loading } = useFetchCollection("products");
  const products = useSelector(selectProduct);
  useEffect(() => {
    dispatch(STORE_PRODUCTS(data));
  }, [dispatch, data]);
  

  return (
    <section>
      <div className={`container ${classes.product}`}>
        <aside className={classes.filter}>
          <ProductsFilter />
        </aside>
        <div className={classes.content}>
          <ProductsList products={products} />
        </div>
      </div>
    </section>
  );
};

export default Products;
