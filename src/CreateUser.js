import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import "./CreateUser.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateUser = () => {
  const req = {
    title: "",
    firstName: "",
    lastName: "",
    email: "",
  };
  const [newUser, setNewUser] = useState(req);
  const [formErrors, setFormErrors] = useState(req);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (newUser.firstName.trim() === "") {
      newErrors.firstName = "First name is required.";
    } else if (/\d/.test(newUser.firstName)) {
      newErrors.firstName = "Title should not contain numbers.";
    }

    if (newUser.lastName.trim() === "") {
      newErrors.lastName = "Last name is required.";
    } else if (/\d/.test(newUser.lastName)) {
      newErrors.lastName = "Title should not contain numbers.";
    }

    if (newUser.title.trim() === "") {
      newErrors.title = "Title is required.";
    } else if (/\d/.test(newUser.title)) {
      newErrors.title = "Title should not contain numbers.";
    }

    if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      newErrors.email = "Invalid email address.";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddUser = (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      axios
        .post("https://dummyapi.io/data/v1/user/create", newUser, {
          headers: {
            "app-id": process.env.REACT_APP_SECRET_KEY,
          },
        })

        .then(({ data }) => {
          console.log(data);
          toast.success("User Added Successfully !", {
            position: toast.POSITION.TOP_RIGHT,
          });

          navigate("/");
        })

        .catch(() =>
          toast.error("url is wrong!", {
            position: toast.POSITION.TOP_RIGHT,
          })
        );
    }
  };

  return (
    <div className="container mt-5">
      <h2>New User Form</h2>

      <form onSubmit={handleAddUser}>
        <div>
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            name="title"
            // onChange={(e) => setNewUser({ ...newUser, title: e.target.value })}
            onChange={handleChange}
          />
          {formErrors.title && (
            <span className="error">{formErrors.title}</span>
          )}
        </div>
        <div>
          <label className="form-label">First Name:</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            // onChange={(e) =>
            //   setNewUser({ ...newUser, firstName: e.target.value })
            // }
            onChange={handleChange}
          />
          {formErrors.firstName && (
            <span className="error">{formErrors.firstName}</span>
          )}
        </div>

        <div>
          <label className="form-label">Last Name:</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            // onChange={(e) =>
            //   setNewUser({ ...newUser, lastName: e.target.value })
            // }
            onChange={handleChange}
          />
          {formErrors.lastName && (
            <span className="error">{formErrors.lastName}</span>
          )}
        </div>

        <div>
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            // onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            onChange={handleChange}
          />
          {formErrors.email && (
            <span className="error">{formErrors.email}</span>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Add User
        </button>

        <Link to="/">
          <button type="submit" className="btn btn-primary ms-3">
            cancle
          </button>
        </Link>
      </form>
    </div>
  );
};

export default CreateUser;
