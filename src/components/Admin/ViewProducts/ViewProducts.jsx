import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import classes from "./ViewProducts.module.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("createdAt", "desc"));

      onSnapshot(q, (snapshot) => {
        console.log(snapshot.docs);
        setProducts(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  console.log(products);

  return (
    <>
      <div className={classes.container}>
        <h2>Все товары</h2>

        {products.length === 0 ? (
          <p>Товары не найдены</p>
        ) : (
          <table className={classes.table}>
            <thead>
              <tr>
                <th className={classes.icons}>№</th>
                <th>Изображение</th>
                <th>Наименование</th>
                <th>Категория</th>
                <th>Цена</th>
                <th>Действие</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      className={classes.img}
                      src={product.imageURL}
                      alt=""
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{`${product.price} р.`}</td>
                  <td>
                    <Link to={`/admin/addproducts`}>
                      <FaEdit size={20} color="green" />
                    </Link>
                    &nbsp;
                    <FaTrashAlt
                      size={20}
                      color="red" /* onClick={() => deleteProduct(product.id)} */
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ViewProducts;
