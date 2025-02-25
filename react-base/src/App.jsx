import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layouts/admin/LayoutAdmin";
import Dashboard from "./pages/admin/Dashboard";
import ListProduct from "./pages/admin/Movies/ListProduct";
import AddProduct from "./pages/admin/Movies/AddProduct";
import EditProduct from "./pages/admin/Movies/EditProduct";
import Category from "./pages/admin/Movies/Category";

// import './App.css'

function App() {
  return (
    <>
      {/* router admin */}
      <Routes>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ListProduct />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/:id/update" element={<EditProduct />} />
          <Route path="category" element={<Category />} />
        </Route>
      </Routes>

      {/* router user */}
      <Routes>
        <Route></Route>
      </Routes>
    </>
  );
}

export default App;
