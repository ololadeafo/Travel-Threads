import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
// import { AuthProvider } from "@galvanize-inc/jwtdown-for-react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Account/Signup.js";
import Login from "./Account/Login.js";
import Logout from "./Account/Logout.js";
import Main from "./Main.jsx";
import Nav from "./Nav.jsx";
import CreateList from "./packingList/CreateList.jsx";
import PackingLists from "./packingList/PackingLists.jsx";
import ListDetail from "./packingList/PackingList.jsx";
import DateDetail from "./DateListDetail.jsx";
import CreateItem from "./addItem.jsx";
import UpdateItem from "./Update/updateItem.jsx";
import UpdateDescription from "./Update/updateDescription.jsx";

function App() {
  const [error] = useState(null);

  return (
    <div>
      <ErrorNotification error={error} />
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/createlist" element={<CreateList />} />
          <Route path="/packinglists" element={<PackingLists />} />
          <Route path="/packinglist/:id" element={<ListDetail />} />
          <Route path="/packinglist/:id/datelists" element={<DateDetail />} />
          <Route
            path="/packinglist/:packing_list_id/datelists/:date_list_id"
            element={<UpdateDescription />}
          />
          <Route
            path="/packinglist/:packing_list_id/datelists/:date_list_id/additems"
            element={<CreateItem />}
          />
          <Route
            path="/packinglist/:packing_list_id/items/:item_id"
            element={<UpdateItem />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
