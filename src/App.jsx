import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
// COMPONENTS
import { Header, Footer } from "./components/index";
// PAGES
import {
  HomePage,
  ContactPage,
  AdminPage,
  OrderPage,
  LoginPage,
  RegisterPage,
  ResetPage,
  BasketPage,
  CheckoutDetails,
  Checkout,
  OrderHistoryPage,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminOnlyRoute from "./components/AdminOnlyRoute/AdminOnlyRoute";
import ProductsDetails from "./components/Products/ProductsDetail/ProductsDetails";
import CheckoutSuccess from "./pages/CheckoutPage/CheckoutSuccess";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
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
          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <AdminPage />
              </AdminOnlyRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
