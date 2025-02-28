import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layouts/admin/LayoutAdmin";
import Dashboard from "./pages/admin/Dashboard";
import ListProduct from "./pages/admin/Movies/ListProduct";

import EditProduct from "./pages/admin/Movies/EditProduct";
import Category from "./pages/admin/Movies/Category";
import AddMovies from "./pages/admin/Movies/AddMovies";
import ListActor from "./pages/admin/Actor/ListActor";
import AddActor from "./pages/admin/Actor/AddActor";
import EditActor from "./pages/admin/Actor/EditActor";

// import './App.css'

function App() {
  return (
    <>
      {/* router admin */}
      <Routes>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="movies" element={<ListProduct />} />
          <Route path="movies/add" element={<AddMovies />} />
          <Route path="movies/:id/update" element={<EditProduct />} />
          <Route path="category" element={<Category />} />
          <Route path="actors" element={<ListActor />} />
          <Route path="actors/add" element={<AddActor />} />
          <Route path="actors/:id/edit" element={<EditActor />} />
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
