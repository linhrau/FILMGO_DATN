import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layouts/admin/LayoutAdmin";
import Dashboard from "./pages/admin/Dashboard";
import CinemaList from "./pages/admin/Cinemas/CinemaList";
import CinemaAdd from "./pages/admin/Cinemas/CinemaAdd";
import CinemaEdit from "./pages/admin/Cinemas/CinemaEdit";
import PromoCodeList from "./pages/admin/PromoCodes/PromoCodeList";
import PromoCodeAdd from "./pages/admin/PromoCodes/PromoCodeAdd";
import PromoCodeEdit from "./pages/admin/PromoCodes/PromoCodeEdit";
import ListProduct from "./pages/admin/Products/ListProduct";
import CreateProduct from "./pages/admin/Products/CreateProduct";
import UpdateProduct from "./pages/admin/Products/UpdateProduct";
// import './App.css'

function App() {
  return <>
  {/* router admin */}
    <Routes>
      <Route path="/admin" element={<LayoutAdmin />}>
        <Route index element={<Dashboard />} />

        {/* CINEMA */}
        <Route path="cinemas" element={<CinemaList />} />
        <Route path="cinemas/add" element={<CinemaAdd />} />
        <Route path="cinemas/edit/:id" element={<CinemaEdit />} />

        {/* PROMO CODE */}
        <Route path="promocodes" element={<PromoCodeList />} />
        <Route path="promocodes/add" element={<PromoCodeAdd />} />
        <Route path="promocodes/update/:id" element={<PromoCodeEdit />} />

        {/* PRODUCT */}
        <Route path="products" element={<ListProduct />} />
        <Route path="products/add" element={<CreateProduct />} />
        <Route path="products/update/:id" element={<UpdateProduct />} />

      </Route>
    </Routes>

 {/* router user */}
    <Routes>
      <Route>
          
      </Route>
    </Routes>

  </>;
}

export default App;
