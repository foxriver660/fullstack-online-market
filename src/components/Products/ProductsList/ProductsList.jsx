import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./ProductsList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { FILTER_BY_SEARCH, SORT_PRODUCTS, selectFilterProducts } from "../../../redux/slice/filterSlice";
import { Search, ProductsItem, Pagination } from "../../index";
const ProductsList = ({ products }) => {
  const dispatch = useDispatch();
  const filteredList = useSelector(selectFilterProducts);

  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredList.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);
  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [sort]);
  return (
    <div className={classes.product_list} id="product">
      <div className={classes.top}>
        <div className={classes.icons}>
          <BsFillGridFill size={22} onClick={() => setGrid(true)} />
          <FaListAlt size={22} onClick={() => setGrid(false)} />
          <p>
            <b>{`${filteredList.length} `}</b> Товаров найдено.
          </p>
        </div>
        {/* SEARCH */}
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* SORT PRODUCT */}
        <div className={classes.sort}>
          <label>Сортировать по:</label>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
            }}
          >
            <option value="latest">Новинки</option>
            <option value="lowest-price">Низкая цена</option>
            <option value="highest-price">Высокая цена</option>
          </select>
        </div>
      </div>
      <div className={grid ? classes.grid : classes.list}>
        {filteredList.length === 0 ? (
          <p>Товары не найдены</p>
        ) : (
          currentProducts.map((product) => {
            return (
              <div key={product.id}>
                <ProductsItem {...product} grid={grid} product={product} />
              </div>
            );
          })
        )}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={filteredList.length}
      />
    </div>
  );
};

export default ProductsList;
