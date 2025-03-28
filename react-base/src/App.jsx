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
import ListBanners from "./pages/admin/Bannners/ListBanners";
import AddBanners from "./pages/admin/Bannners/AddBanners";
import UserList from "./admin/user/UserList";
import UpdateCinema from "./admin/cinema/UpdateCinema";
import ListCinema from "./admin/cinema/ListCinema";
import CreatCinema from "./admin/cinema/CreateCinema";
import Signup from "./SignUp";
import Signin from "./SignIn";
import CreatProvince from "./admin/province/CreateProvince";
import ListProvince from "./admin/province/ListProvince";
import UpProvince from "./admin/province/UpProvince";
import CreatRoom from "./admin/room/CreateRoom";
import ListRoom from "./admin/room/ListRoom";
import UpdateRoom from "./admin/room/UpdateRoom";
import ListShow from "./admin/showtimes/ListShow";
import CreateShow from "./admin/showtimes/CreateShow";
import UpdateShow from "./admin/showtimes/UpdateShow";
import ListProduct from "./pages/admin/Products/ListProduct";
import CreateProduct from "./pages/admin/Products/CreateProduct";
import UpdateProduct from "./pages/admin/Products/UpdateProduct";

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
          <Route path="list-banners" element={<ListBanners />} />
          <Route path="create-banners" element={<AddBanners />} />
          <Route path="list-user" element={<UserList />} />
          <Route path="list-cinema" element={<ListCinema />} />
          <Route path="creat-cinema" element={<CreatCinema />} />
          <Route path="update-cinema/:id" element={<UpdateCinema />} />
          <Route
            path="/admin/creat-province"
            element={<CreatProvince />}
          ></Route>
          <Route path="/admin/list-province" element={<ListProvince />}></Route>
          <Route
            path="/admin/update-province/:id"
            element={<UpProvince />}
          ></Route>
          <Route path="/admin/creat-screen" element={<CreatRoom />}></Route>
          <Route path="/admin/list-screen" element={<ListRoom />}></Route>
          <Route
            path="/admin/update-screen/:id"
            element={<UpdateRoom />}
          ></Route>
          <Route path="/admin/creat-showtime" element={<CreateShow />}></Route>
          <Route path="/admin/list-showtime" element={<ListShow />}></Route>
          <Route
            path="/admin/update-showtime/:id"
            element={<UpdateShow />}
          ></Route>
          <Route path="list-product" element={<ListProduct />} />
          <Route path="creat-product" element={<CreateProduct />} />
          <Route path="update-product/:id" element={<UpdateProduct />} />
        </Route>
        <Route>
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
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
