import "./App.css";
import { useState, useEffect } from "react";

import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

// import { Link } from "react-router-dom";

function UserList() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    async function fetchData() {
      try {
        const headers = {
          "app-id": process.env.REACT_APP_SECRET_KEY,
        };
        setIsLoading(true);
        const { data } = await axios.get(
          `https://dummyapi.io/data/v1/user?page=${currentPage}&limit=${limit}`,
          {
            headers: headers,
          }
        );
        setUsers(data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [currentPage]);

  const handleDelete = (userId) => {
    if (window.confirm("are you sure you want to delete this user ")) {
      axios
        .delete(`https://dummyapi.io/data/v1/user/${userId}`, {
          headers: {
            "app-id": process.env.REACT_APP_SECRET_KEY,
          },
        })
        .then(() => {
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="conainer mt-5">
      <div className="d-flex justify-content-center align-items-center h-screen bg-gray-100">
        <div className="w-50 p-6 bg-white rounded shadow">
          <h1 className="mb-4 text-center text-2xl font-semibold">User List</h1>

          <div className="grid p-4 justify-center">
            <div className="d-flex justify-content-end mb-3">
              <Link to="/create">
                <button className="btn btn-primary btn-lg  ">Add User</button>
              </Link>
            </div>
            {isLoading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <div>
                <table className="w-100 border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th
                        className="border border-gray-300 px-4 py-2 text-capitalize"
                        id="title"
                      >
                        Title
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Image
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        First Name
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Last Name
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2 text-capitalize">
                          {user.title}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <img
                            id="image"
                            src={user.picture}
                            alt={`${user.firstName} ${user.lastName}`}
                            className="w-12 h-12 object-cover rounded-full"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-capitalize">
                          {user.firstName}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-capitalize">
                          {user.lastName}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 ">
                          <Link
                            to={{
                              pathname: `/edit-user/${user.id}`,
                              state: { user },
                            }}
                          >
                            <button className="btn btn-secondary me-2">
                              Edit
                            </button>
                          </Link>
                          <Link>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(user.id)}
                            >
                              Delete
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="pagination-container">
              <button
                className="pagination-button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              <div className="pagination-buttons">
                <button
                  className="pagination-button"
                  disabled={currentPage === 5}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
