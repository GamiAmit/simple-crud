import React, { useState, useEffect } from "react";
import axios from "axios";
// import { GoogleLogin } from "@react-oauth/google";
import "./App.css";

import * as Yup from "yup";
import "./signin.css";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [apiCalled, setApiCalled] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    let newErrors = {};
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address.";
    }
    if (password.trim() === "") {
      newErrors.password = "password is required.";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    document.title = "Sign In";
  });
  const signIn = (e) => {
    const isValide = validateForm();

    e.preventDefault();
    if (isValide && !apiCalled) {
      axios
        .post("https://reqres.in/api/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          navigate("/userList");
        })
        .catch((error) => {
          alert("error");
          console.log(error);
        });
      setApiCalled(true);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      navigate("/userList");
    }
  }, [navigate]);
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={signIn}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign in</h3>
          <div className="text-center">
            Not registered yet?
            <Link to="/signUp">
              <span className="link-primary">Sign Up</span>
            </Link>
          </div>

          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              value={email}
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={handleEmail}
            />
            {formErrors.email && (
              <span className="error">{formErrors.email}</span>
            )}
          </div>
          <div className="form-group mt-3 password">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={handlePassword}
            />
            {formErrors.password && (
              <span className="error">{formErrors.password}</span>
            )}
            <div
              className="d-flex justify-content-end showhide"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "🙉" : "🙈"}
            </div>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary w-100">
              {apiCalled ? "Loading..." : "Log In"}
            </button>
          </div>
          {/* <p> OR</p> */}
          <GoogleAuth />
        </div>
      </form>
    </div>
  );
};

export default Signin;
