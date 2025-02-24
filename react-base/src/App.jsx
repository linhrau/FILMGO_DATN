import "./App.scss";
import { Route, Routes } from "react-router-dom";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import LayoutAdmin from "./layout/LayoutAdmin";
import Dashbroad from "./Dashbroad";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashbroad />} />
        </Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
      </Routes>
    </>
  );
}

export default App;
