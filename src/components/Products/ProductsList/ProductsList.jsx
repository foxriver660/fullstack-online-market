import React, { useState } from "react";
import classes from "./ProductsList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../../Search/Search";
import ProductsItem from "../ProductsItem/ProductsItem";

const ProductsList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");

  return (
    <div className={classes.product_list}>
      <div className={classes.top} id="product">
        <div className={classes.icons}>
          <BsFillGridFill size={22} onClick={() => setGrid(true)} />
          <FaListAlt size={22} onClick={() => setGrid(false)} />
          <p>
            <b>{`${products.length} `}</b> Товаров найдено.
          </p>
        </div>
        {/* SEARCH */}
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* SORT PRODUCT */}
        <div className={classes.sort}>
          <label>Сортировать по:</label>
          <select>
            <option value="latest">Новинки</option>
            <option value="lowest-price">Низкая цена</option>
            <option value="highest-price">Высокая цена</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>
      <div className={grid ? classes.grid : classes.list}>
        {products.length === 0 ? (
          <p>Товары не найдены</p>
        ) : (
          products.map((product) => {
            return (
              <div key={product.id}>
                <ProductsItem {...product} grid={grid} product={product} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProductsList;
