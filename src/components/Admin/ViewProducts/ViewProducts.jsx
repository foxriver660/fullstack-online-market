import { deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import classes from "./ViewProducts.module.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS } from "../../../redux/slice/productSlice";
import useFetchCollection from "../../../hook/useFetchCollection";
import { selectProduct } from "../../../redux/slice/productSlice";

const ViewProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProduct);

  const { data, isLoading } = useFetchCollection("products");

  useEffect(() => {
    dispatch(STORE_PRODUCTS(data));
  }, [dispatch, data]);

  const confirmDelete = (id, image) => {
    Notiflix.Confirm.show(
      "Удалить продукт?",
      "Подтвердить удаление продукта",
      "Да",
      "Нет",
      function okCb() {
        deleteProduct(id, image);
      },
      function cancelCb() {
        toast.info("Удаление продукта отменено");
      },
      {
        width: "320px",
        borderRadius: "6px",
        titleColor: "var(--color-danger)",
        okButtonBackground: "var(--color-danger)",
        cssAnimationStyle: "zoom",
      }
    );
  };
  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Продукт успешно удален");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
                      <img className={classes.img} src={product.imageURL} alt="" />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{`${product.price} р.`}</td>
                    <td>
                      <Link to={`/admin/addproducts/${product.id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt size={20} color="red" onClick={() => confirmDelete(product.id, product.imageURL)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
};

export default ViewProducts;
