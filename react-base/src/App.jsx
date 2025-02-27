import "./App.scss";
import { Routes, Route } from "react-router-dom";
import LayoutAdmin from "@/layouts/admin/LayoutAdmin";
import Dashboard from "@/pages/admin/Dashboard";
import Seat from "@/pages/admin/Seat";

function App() {
  return (
    <>
      {/* router admin */}
      <Routes>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="seats" element={<Seat />} />
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
