import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./UserList";
// import CreateUser from "./CreateUser";
// import EditUser from "./EditUser";
import { ToastContainer } from "react-toastify";
import CreateEdit from "./CreateEdit";
import Signin from "./Signin";
import SignUp from "./SignUp1";
import PrivetRoute from "./PrivetRoute";
import User from "./User";
import NotFound from "./NotFound";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/userList" exact element={<UserList />} />
          <Route path="/create" element={<CreateEdit />} />
          {/* create and edit cambine in 1 components */}
          <Route
            path="/edit-user/:userId"
            element={<CreateEdit isUpdate={true} />}
          />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
