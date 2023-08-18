import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<UserList />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/edit-user/:userId" element={<EditUser />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
