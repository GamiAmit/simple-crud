import React from "react";
import { Outlet } from "react-router-dom";
import UserList from "./UserList";
import Signin from "./Signin";

const PrivetRoute = () => {
  const login = false;
  if (login) {
    return <Outlet />;
  } else {
    return <UserList />;
  }
};

export default PrivetRoute;
