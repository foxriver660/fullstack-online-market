import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header, Footer } from "./components/index";

import {
  HomePage,
  ContactPage,
  AdminPage,
  LoginPage,
  RegisterPage,
  ResetPage,
  BasketPage,
  CheckoutDetails,
  Checkout,
  OrderHistoryPage,
  OrderDetailsPage,
  ReviewProductsPage,
  NotFoundPage,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminOnlyRoute from "./components/AdminOnlyRoute/AdminOnlyRoute";
import ProductsDetails from "./components/Products/ProductsDetail/ProductsDetails";
import CheckoutSuccess from "./pages/CheckoutPage/CheckoutSuccess";
import Layout from "./pages/Layout/Layout";

function App() {
  return (
    <>
      <BrowserRouter basename="/fullstack-online-market/">
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reset" element={<ResetPage />} />
            <Route path="/product-details/:id" element={<ProductsDetails />} />
            <Route path="/basket" element={<BasketPage />} />
            <Route path="/checkout-details" element={<CheckoutDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/order-history" element={<OrderHistoryPage />} />
            <Route path="/order-details/:id" element={<OrderDetailsPage />} />
            <Route path="/review-product/:id" element={<ReviewProductsPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="/admin/*"
              element={
                <AdminOnlyRoute>
                  <AdminPage />
                </AdminOnlyRoute>
              }
            />
          </Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
