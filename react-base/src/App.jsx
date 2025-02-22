import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layouts/admin/LayoutAdmin";
import Dashboard from "./pages/admin/Dashboard";
// import './App.css'

function App() {
  return <>
  {/* router admin */}
    <Routes>
      <Route path="/admin" element={<LayoutAdmin />}>
        <Route index element={<Dashboard />} />
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
