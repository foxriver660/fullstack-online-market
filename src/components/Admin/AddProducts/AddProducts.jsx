import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import Card from "../../Card/Card";
import classes from "./AddProducts.module.scss";
import Loader from "../../Loader/Loader";

const categorys = [
  {
    id: 1,
    name: "Phones",
  },
  {
    id: 2,
    name: "Laptops",
  },
  {
    id: 3,
    name: "Notebooks",
  },
];
const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};

const AddProducts = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    ...initialState,
  });
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const storageRef = ref(storage, `eshop/${Date.now()} ${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({
            ...product,
            imageURL: downloadURL,
          });
          toast.success("Product IMG added successfully");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      toast.success("Product added successfully");
      setIsLoading(false);
      setProgress(0);
      setProduct({
        ...initialState,
      });
      navigate("/admin/viewproducts");
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className={classes.product}>
        <h1>Добавить продукт</h1>
        <Card className={classes.card}>
          <form onSubmit={addProduct}>
            <label>Название:</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
            <label>Изображение:</label>
            <Card className={classes.group}>
              {progress === 0 ? null : (
                <div className={classes.progress}>
                  <div
                    style={{ width: `${progress}%` }}
                    className={classes.progress_bar}
                  >
                    {progress < 100
                      ? `Загружено: ${progress}%`
                      : `Загрузка завершена  ${progress}%`}
                  </div>
                </div>
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                placeholder="Product Image"
              />
              {product.imageURL === "" ? null : (
                <input
                  type="text"
                  // required
                  placeholder="Image URL"
                  name="imageURL"
                  value={product.imageURL}
                  disabled
                />
              )}
            </Card>
            <label>Стоимость:</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
            <label>Категория:</label>
            <select
              required
              name="category"
              value={product.category}
              onChange={handleChange}
            >
              <option value="" disabled>
                Выберите категорию
              </option>
              {categorys.map((category) => {
                return (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </select>
            <label>Брэнд:</label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              required
            />
            <label>Описание:</label>
            <textarea
              cols="30"
              rows="10"
              name="desc"
              value={product.desc}
              onChange={handleChange}
              required
            ></textarea>
            <button className="--btn --btn-primary" type="submit">
              Добавить
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProducts;
