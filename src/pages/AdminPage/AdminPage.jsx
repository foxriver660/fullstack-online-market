import React from "react";
import { NavBar, Home, Orders, AddProducts, ViewProducts } from "../../components";
import styles from "./AdminPage.module.scss";
import { Routes, Route } from "react-router-dom";
import OrderDetails from "../../components/Admin/OrderDetails/OrderDetails";

const AdminPage = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <NavBar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="viewproducts" element={<ViewProducts />} />
          <Route path="addproducts/:id" element={<AddProducts />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
