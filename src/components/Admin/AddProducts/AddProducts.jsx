import { ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { storage } from "../../../firebase/config";
import Card from "../../Card/Card";
import classes from "./AddProducts.module.scss";

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

const AddProducts = () => {
  const [product, setProduct] = useState({
    name: "",
    imageURL: "",
    price: 0,
    category: "",
    brand: "",
    desc: "",
  });

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
  };
  const addProduct = (e) => {
    e.preventDefault();
    console.log(product);
  };
  return (
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
            <div className={classes.progress}>
              <div style={{ width: "50%" }} className={classes.progress_bar}>
                Загружено: 50%
              </div>
            </div>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              placeholder="Product Image"
            />
            <input
              type="text"
              // required
              placeholder="Image URL"
              name="imageURL"
              value={product.imageURL}
              disabled
            />
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
  );
};

export default AddProducts;
