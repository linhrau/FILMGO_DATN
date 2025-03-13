import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layouts/admin/LayoutAdmin";
import Dashboard from "./pages/admin/Dashboard";

import AddMovies from "./pages/admin/Movies/AddMovies";
import ListActor from "./pages/admin/Actors/ListActors";
import AddActor from "./pages/admin/Actors/AddActors";
import EditActor from "./pages/admin/Actors/EditActors";
import ListGenres from "./pages/admin/Genres/ListGenres";
import AddGenres from "./pages/admin/Genres/AddGenres";
import EditGenres from "./pages/admin/Genres/EditGenres";
import ListMovies from "./pages/admin/Movies/ListMovies";
import EditMovies from "./pages/admin/Movies/EditMovies";

// import './App.css'

function App() {
  return (
    <>
      {/* router admin */}
      <Routes>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="list-movies" element={<ListMovies />} />
          <Route path="create-movies" element={<AddMovies />} />
          <Route path="update-movies/:id" element={<EditMovies />} />
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
