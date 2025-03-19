import { Route, Routes } from "react-router-dom";
import CinemaAdd from "./components/pages/Cinemas/CinemaAdd";
import CinemaEdit from "./components/pages/Cinemas/CinemaEdit";
import CinemaList from "./components/pages/Cinemas/CinemaList";
import Dashboard from "./components/pages/Dashboard";
import CreateProduct from "./components/pages/Products/CreateProduct";
import ListProduct from "./components/pages/Products/ListProduct";
import UpdateProduct from "./components/pages/Products/UpdateProduct";
import PromoCodeAdd from "./components/pages/PromoCodes/PromoCodeAdd";
import PromoCodeEdit from "./components/pages/PromoCodes/PromoCodeEdit";
import PromoCodeList from "./components/pages/PromoCodes/PromoCodeList";
import LayoutAdmin from "./components/templates/LayoutAdmin";

function App() {
  return (
    <>
      {/* router admin */}
      <Routes>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />

          {/* CINEMA */}
          <Route path="cinemas" element={<CinemaList />} />
          <Route path="cinemas/add" element={<CinemaAdd />} />
          <Route path="cinemas/edit/:id" element={<CinemaEdit />} />

          {/* PROMO CODE */}
          <Route path="list-promocode" element={<PromoCodeList />} />
          <Route path="create-promocode" element={<PromoCodeAdd />} />
          <Route path="update-promocode/:id" element={<PromoCodeEdit />} />

          {/* PRODUCT */}
          <Route path="list-product" element={<ListProduct />} />
          <Route path="creat-product" element={<CreateProduct />} />
          <Route path="update-product/:id" element={<UpdateProduct />} />
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
