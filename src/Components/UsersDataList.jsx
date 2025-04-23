import React, { useEffect, useState } from "react";
import api from "../Services/api";
import { useNavigate } from "react-router-dom";

const UsersDataList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users?status=true");
      // console.log("Fetched users:", res.data);
      setUsers(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const executePurge = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.patch(`/users/${id}`, { status: false });
        fetchUsers();
      } catch (err) {
        setError("Failed to delete user.");
      }
    }
  };

  const executeUpdate = (id) => {
    navigate(`/edit/${id}`);
  };

  const goToAdd = () => {
    navigate("/add");
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container my-4" style={{ backgroundColor: "#ffffff" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Active Users</h2>
        <button onClick={goToAdd} className="btn btn-primary">
          + Add User
        </button>
      </div>

      {error && <p className="text-danger">{error}</p>}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-primary">
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <img
                      src={u.image || "/path/to/default-avatar.jpg"}
                      alt={u.name || "User Avatar"}
                      className="rounded-circle"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>
                    <button
                      onClick={() => executeUpdate(u.id)}
                      className="btn btn-sm btn-secondary me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => executePurge(u.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No active users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersDataList;
