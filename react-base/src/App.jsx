import "./App.scss";
import { Route, Routes } from "react-router-dom";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import LayoutAdmin from "./layout/LayoutAdmin";
import Dashbroad from "./Dashbroad";
import UserList from "./admin/user/UserList";
import ListCinema from "./admin/cinema/ListCinema";
import CreatCinema from "./admin/cinema/CreatCinema";
import UpdateCinema from "./admin/cinema/UpdateCinema";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashbroad />} />
          <Route path="/admin/list-user" element={<UserList />}></Route>
          <Route path="/admin/list-cinema" element={<ListCinema />}></Route>
          <Route path="/admin/creat-cinema" element={<CreatCinema />}></Route>
          <Route
            path="/admin/update-cinema/:id"
            element={<UpdateCinema />}
          ></Route>
        </Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
      </Routes>
    </>
  );
}

export default App;
