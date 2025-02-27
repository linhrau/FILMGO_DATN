import "./App.scss";

import { Routes, Route } from "react-router-dom";
import routers from "@/routers/routers";

function App() {
  return (
    <div>
      <Routes>
        {routers.map((item, index) => {
          return (
            <Route
              path={item.path}
              element={<item.component />}
              key={index}
            ></Route>
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
