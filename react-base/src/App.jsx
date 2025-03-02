import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layouts/admin/LayoutAdmin";
import Dashboard from "./pages/admin/Dashboard";
import ListProduct from "./pages/admin/Movies/ListProduct";
import EditProduct from "./pages/admin/Movies/EditProduct";
import AddMovies from "./pages/admin/Movies/AddMovies";
import ListActor from "./pages/admin/Actor/ListActor";
import AddActor from "./pages/admin/Actor/AddActor";
import EditActor from "./pages/admin/Actor/EditActor";
import ListGenres from "./pages/admin/Genres/ListGenres";
import AddGenres from "./pages/admin/Genres/AddGenres";
import EditGenres from "./pages/admin/Genres/EditGenres";

// import './App.css'

function App() {
  return (
    <>
      {/* router admin */}
      <Routes>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="list-movies" element={<ListProduct />} />
          <Route path="create-movies" element={<AddMovies />} />
          <Route path="update-movies/:id" element={<EditProduct />} />
          <Route path="list-actors" element={<ListActor />} />
          <Route path="create-actors" element={<AddActor />} />
          <Route path="update-actors/:id" element={<EditActor />} />
          <Route path="list-genres" element={<ListGenres />} />
          <Route path="create-genres" element={<AddGenres />} />
          <Route path="update-genres/:id" element={<EditGenres />} />
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
