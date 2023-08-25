import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import axios from "axios";

const EditUser = () => {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const req = { title: "", firstName: "", lastName: "" };
  const [users, setUsers] = useState([req]);
  const [formErrors, setFormErrors] = useState(req);
  const validateForm = () => {
    let newErrors = {};

    if (users.firstName.trim() === "") {
      newErrors.firstName = "First name is required.";
    } else if (/\d/.test(users.firstName)) {
      newErrors.firstName = "Title should not contain numbers.";
    }

    if (users.lastName.trim() === "") {
      newErrors.lastName = "Last name is required.";
    } else if (/\d/.test(users.lastName)) {
      newErrors.lastName = "Title should not contain numbers.";
    }

    if (users.title.trim() === "") {
      newErrors.title = "Title is required.";
    } else if (/\d/.test(users.title)) {
      newErrors.title = "Title should not contain numbers.";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://dummyapi.io/data/v1/user/${userId}`,
          {
            headers: { "app-id": process.env.REACT_APP_SECRET_KEY },
          }
        );
        setUsers({
          title: data?.title,
          firstName: data?.firstName,
          lastName: data?.lastName,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleSave = (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      axios
        .put(`https://dummyapi.io/data/v1/user/${userId}`, users, {
          headers: { "app-id": process.env.REACT_APP_SECRET_KEY },
        })

        .then((res) => {
          console.log(res);
          NotificationManager.success(
            "Success message",
            "user update successfully"
          );
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="container mt-5">
      <h2>Update User </h2>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label className="form-label">Title:</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={users.title}
              onChange={(e) => setUsers({ ...users, title: e.target.value })}
            />
            {formErrors.title && (
              <span className="error">{formErrors.title}</span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">First Name:</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={users.firstName}
              onChange={(e) =>
                setUsers({ ...users, firstName: e.target.value })
              }
            />
            {formErrors.firstName && (
              <span className="error">{formErrors.firstName}</span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name:</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={users.lastName}
              onChange={(e) => setUsers({ ...users, lastName: e.target.value })}
            />
            {formErrors.lastName && (
              <span className="error">{formErrors.lastName}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            save
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

export default EditUser;
