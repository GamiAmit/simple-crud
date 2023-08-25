import React, { useState, useEffect } from "react";
import axios from "./axiosInstance";
// import axios from "axios";
import "./App.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./CreateUser.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateEdit = ({ isUpdate }) => {
  const req = {
    title: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const { userId } = useParams();

  const [newUser, setNewUser] = useState(req);
  const [formErrors, setFormErrors] = useState(req);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isUpdate && isValid) {
      axios({
        method: "put",
        url: `user/${userId}`,
        data: newUser,
      })
        .then((response) => {
          console.log(response);
          toast.success("User Updated Successfully !", {
            position: toast.POSITION.TOP_RIGHT,
          });
          navigate("/userList");
          setIsLoading(false);
        })
        .catch((err) =>
          toast.error(err.message, {
            position: toast.POSITION.TOP_RIGHT,
          })
        );
    } else if (isValid) {
      setIsLoading(true);

      axios({
        method: "post",
        url: "user/create",
        data: newUser,
      })
        .then(({ data }) => {
          console.log(data);
          toast.success("User Added Successfully !", {
            position: toast.POSITION.TOP_RIGHT,
          });

          navigate("/userList");
          setIsLoading(false);
        })

        .catch((err) =>
          toast.error(err.message, {
            position: toast.POSITION.TOP_RIGHT,
          })
        );
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `user/${userId}`
          // headers: { "app-id": process.env.REACT_APP_SECRET_KEY },
        );
        setNewUser({
          title: data?.title,
          firstName: data?.firstName,
          lastName: data?.lastName,
          email: data?.email,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [userId]);
  useEffect(() => {
    if (isUpdate) {
      document.title = "Update user";
    } else {
      document.title = "Create USer";
    }
  });
  return (
    <div className="container mt-5">
      <h2>{isUpdate ? "Update User" : "Create User"}</h2>
      {isLoading && isUpdate ? (
        <p className="text-center">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label">Title:</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={newUser.title}
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
              value={newUser.firstName}
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
              value={newUser.lastName}
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
              value={newUser.email}
              onChange={handleChange}
            />
            {formErrors.email && (
              <span className="error">{formErrors.email}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            {isUpdate ? "Update" : "Add User"}
          </button>

          <Link to="/userList">
            <button type="submit" className="btn btn-primary ms-3">
              cancle
            </button>
          </Link>
        </form>
      )}
    </div>
  );
};

export default CreateEdit;
