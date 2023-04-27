import { useState } from "react";
import ErrorNotification from "./ErrorNotification";
import "./CSS/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Logout from "./Logout.jsx";
import Main from "./Main.jsx";
import Nav from "./Nav.jsx";
import CreateList from "./packingList/CreateList.jsx";
import PackingLists from "./packingList/PackingLists.jsx";
import ListDetail from "./packingList/PackingList.jsx";
import DateDetail from "./DateListDetail.jsx";
import CreateItem from "./addItem.jsx";
import UpdateItem from "./Update/updateItem.jsx";
import UpdateDescription from "./Update/updateDescription.jsx";
import LoginModal from "./components/loginModal.js";
import SignUpModal from "./components/signupModal.js";

function App() {
  const [error] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleShowLoginModal = () => setShowLoginModal(true);

  const handleCloseSignUpModal = () => setShowSignUpModal(false);
  const handleShowSignUpModal = () => setShowSignUpModal(true);

  return (
    <div>
      <ErrorNotification error={error} />
      <BrowserRouter>
        <Nav
          handleShowLoginModal={handleShowLoginModal}
          handleShowSignUpModal={handleShowSignUpModal}
        />
        <LoginModal
          showLoginModal={showLoginModal}
          handleCloseLoginModal={handleCloseLoginModal}
        />
        <SignUpModal
          showSignUpModal={showSignUpModal}
          handleCloseSignUpModal={handleCloseSignUpModal}
        />
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
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
