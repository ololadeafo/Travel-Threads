import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
// import { AuthProvider } from "@galvanize-inc/jwtdown-for-react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup.js";
import Login from "./Login.js";
import Logout from "./Logout.js";
import Main from "./Main.jsx";
import Nav from "./Nav.jsx";
import CreateList from "./CreateList.jsx";
import PackingLists from "./PackingLists.jsx";
import ListDetail from "./PackingList.jsx";
import DateDetail from "./DateListDetail.jsx";
import CreateItem from "./addItem.jsx";
import UpdateItem from "./updateItem.jsx";

function App() {
  const [error] = useState(null);

  return (
    <div>
      <ErrorNotification error={error} />
      <BrowserRouter>
        <Nav />
        <div>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/createlist" element={<CreateList />} />
            <Route path="/packinglists" element={<PackingLists />} />
            <Route path="/packinglist/:id" element={<ListDetail />} />
            <Route path="/packinglist/:id/datelists" element={<DateDetail />} />
            <Route path="/packinglist/:packing_list_id/datelists/:date_list_id/additems" element={<CreateItem />} />
            <Route path="/packinglist/:packing_list_id/datelists/:date_list_id/items/:item_id" element={<UpdateItem />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
