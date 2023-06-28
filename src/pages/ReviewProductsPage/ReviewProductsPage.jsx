import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./ReviewProductsPage.module.scss";
import StarsRating from "react-star-rate";
import { useParams } from "react-router-dom";
import { selectUserId, selectUserName } from "../../redux/slice/authSlice";
import { Card } from "../../components";
import { toast } from "react-toastify";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import useFetchDocument from "../../hook/useFetchDocument";

const ReviewProductsPage = () => {
  const { id } = useParams();
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);
  const userID = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const { document } = useFetchDocument("products", id);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const submitReview = (e) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toDateString();
    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Отзыв успешно добавлен");
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      <div className={`container ${styles.review}`}>
        {!product ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>
              <b>Товар:</b> {product.name}
            </p>
            <img src={product.imageURL} alt={product.name} style={{ width: "100px" }} />
          </>
        )}

        <Card cardClass={styles.card}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>Оценить:</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />
            <label>Написать отзыв</label>
            <textarea
              value={review}
              required
              onChange={(e) => setReview(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
            <button type="submit" className="--btn --btn-primary">
              Сохранить
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewProductsPage;
