import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/layouts/MainLayout";
import LayoutLoginAndRegister from "./components/layouts/LayoutLoginAndRegister";
import EmployeeList from "./components/pages/EmployeeList";
import ProductPage from "./components/pages/ProductPage";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/loginAndRegistePage/LoginPage";
import RegisterPage from "./components/pages/loginAndRegistePage/RegisterPage";
import CategoryPage from "./components/pages/CategoryPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/employee" element={<EmployeeList />} />
            {/* <Route path="/employee" element={<EmployeeList />} /> */}
            <Route path="/product" element={<ProductPage />} />
            <Route path="/category" element={<CategoryPage />} />
          </Route>
          {/* //here is page for register page and for login page */}
          <Route element={<LayoutLoginAndRegister />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* <Route path="*" element={<LoginPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
