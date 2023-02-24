import React from "react";
import { NavBar, Home, Orders, AddProducts, ViewProducts } from "../../components";
import classes from "./AdminPage.module.scss";
import { Routes, Route } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className={classes.admin}>
    
      <div className={classes.navbar}>
        <NavBar />
      </div>
      <div className={classes.content}>
        <Routes>
          <Route path='home' element={<Home />} />
          <Route path='viewproducts' element={< ViewProducts/>} />
          <Route path='addproducts/:id' element={< AddProducts/>} />
          <Route path='orders' element={< Orders/>} />
        </Routes>
      </div> 
    </div>
  );
};

export default AdminPage;
