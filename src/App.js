import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

import { Header, Footer } from "./components/index";
import { HomePage, ContactPage, CardPage, AdminPage, OrderPage } from "./pages";

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
