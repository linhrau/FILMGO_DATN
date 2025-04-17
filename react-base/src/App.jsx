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
import CreatRoom from "./admin/room/CreatRoom";
import CreatProvince from "./admin/province/CreatProvince";
import ListProvince from "./admin/province/ListProvince";
import UpProvince from "./admin/province/UpProvince";
import ListRoom from "./admin/room/ListRoom";
import UpdateRoom from "./admin/room/UpdateRoom";
import PageNotFound from "./PageNotFound";
import CreateShow from "./admin/showtimes/CreateShow";
import UpdateShow from "./admin/showtimes/UpdateShow";
import ListShow from "./admin/showtimes/ListShow";
import FogotPass from "./FogotPass";
import Changepass from "./Changepass";
import ListTiket from "./admin/ticket/ListTiket";
import CheckTicket from "./admin/ticket/CheckTiket";
import DetailTiket from "./admin/ticket/DetailTiket";
import LayoutStaff from "./layout/LayoutStaff";
import UpdateUser from "./admin/user/UpdateUser";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashbroad />} />
          <Route path="/admin/list-user" element={<UserList />}></Route>
          <Route path="/admin/update-user/:id" element={<UpdateUser />}></Route>
          <Route path="/admin/list-cinema" element={<ListCinema />}></Route>
          <Route path="/admin/creat-cinema" element={<CreatCinema />}></Route>
          <Route
            path="/admin/update-cinema/:id"
            element={<UpdateCinema />}
          ></Route>
          <Route path="/admin/creat-screen" element={<CreatRoom />}></Route>
          <Route path="/admin/list-screen" element={<ListRoom />}></Route>
          <Route
            path="/admin/update-screen/:id"
            element={<UpdateRoom />}
          ></Route>
          <Route
            path="/admin/creat-province"
            element={<CreatProvince />}
          ></Route>
          <Route path="/admin/list-province" element={<ListProvince />}></Route>
          <Route
            path="/admin/update-province/:id"
            element={<UpProvince />}
          ></Route>
          <Route path="/admin/creat-showtime" element={<CreateShow />}></Route>
          <Route path="/admin/list-showtime" element={<ListShow />}></Route>
          <Route
            path="/admin/update-showtime/:id"
            element={<UpdateShow />}
          ></Route>
          <Route path="/admin/list-ticket" element={<ListTiket />}></Route>
          <Route path="/admin/check-ticket" element={<CheckTicket />}></Route>
          <Route
            path="/admin/detail-ticket/:id"
            element={<DetailTiket />}
          ></Route>
        </Route>
        <Route path="/staff" element={<LayoutStaff />}>
          <Route path="/staff/list-ticket" element={<ListTiket />}></Route>
          <Route path="/staff/check-ticket" element={<CheckTicket />}></Route>
          <Route
            path="/staff/detail-ticket/:id"
            element={<DetailTiket />}
          ></Route>
        </Route>

        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/pagenot" element={<PageNotFound />}></Route>
        <Route path="/fogotpass" element={<FogotPass />}></Route>
        <Route path="/changepass" element={<Changepass />}></Route>
      </Routes>
    </>
  );
}

export default App;
