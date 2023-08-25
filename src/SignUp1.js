import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });

  const navigate = useNavigate();

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
    if (!/\S+@\S+\.\S+/.test(setEmail.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (password.trim() === "") {
      newErrors.password = "password is required.";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    document.title = "Sign Up";
  });
  const signUp = (e) => {
    e.preventDefault();
    validateForm();

    axios
      .post("https://reqres.in/api/register", {
        email: email,
        password: password,
      })
      .then(() => {
        alert("success");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={signUp}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?
              <Link to="/">
                <span className="link-primary">Sign In</span>
              </Link>
            </div>

            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                onChange={handleEmail}
                value={email}
              />
              {formErrors.email && (
                <span className="error">{formErrors.email}</span>
              )}
            </div>
            <div className="form-group mt-3 password">
              <label>Password</label>

              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control mt-1"
                placeholder="Password"
                onChange={handlePassword}
                value={password}
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
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
