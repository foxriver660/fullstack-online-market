import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
// COMPONENTS
import { Header, Footer } from "./components/index";
// PAGES
import {
  HomePage,
  ContactPage,
  CartPage,
  AdminPage,
  OrderPage,
  LoginPage,
  RegisterPage,
  ResetPage,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminOnlyRoute from "./components/AdminOnlyRoute/AdminOnlyRoute";
console.log(AdminPage)
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

          <Route path="/admin/*" element={<AdminOnlyRoute><AdminPage /></AdminOnlyRoute>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
