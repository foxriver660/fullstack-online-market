import React, { useEffect, useState } from "react";
import classes from "./ProductsDetails.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
const ProductsDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setProduct({ ...docSnap.data(), id: id });
    } else {
      toast.error("Продукт не найден");
    }
  };
  useEffect(() => {
    getProduct();
  }, [id]);

  const goBack = () => {
    navigate('/#product');
  };
  return (
    <section>
      <div className={`container ${classes.product}`}>
        <h2>Описание товара</h2>
        <div onClick={goBack}>&larr; Вернуться назад</div>
        {product && (
          <>
            <div className={classes.details}>
              <div className={classes.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={classes.content}>
                <h3>{product.name}</h3>
                <p className={classes.price}>{product.price} &#8381;</p>
                <p>{product.desc}</p>
                <p>
                  <b>Индентификатор:</b> {product.id}
                </p>
                <p>
                  <b>Брэнд:</b> {product.brand}
                </p>
                <div className={classes.count}>
                  <button className="--btn">-</button>
                  <p>1</p>
                  <button className="--btn">+</button>
                </div>
                <button className="--btn --btn-danger">
                  Добавить в корзину
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductsDetails;
