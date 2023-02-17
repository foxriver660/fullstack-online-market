import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
// COMPONENTS
import { Header, Footer } from "./components/index";
// PAGES
import { HomePage, ContactPage, CartPage, AdminPage, OrderPage } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
