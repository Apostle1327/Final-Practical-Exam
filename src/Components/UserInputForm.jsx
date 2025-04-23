import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UsersDataList from "./UsersDataList";
import api from "../Services/api";

const UserInputForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await api.get("/users");
        setUsers(res.data || []);
      } catch {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (isEditing) {
      const fetchUserData = async () => {
        try {
          setLoading(true);
          const res = await api.get(`/users/${id}`);
          setUserData(res.data);
        } catch {
          setError("Failed to load user data.");
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [id, isEditing]);

  const executeModifications = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, phone } = userData;
    if (name.trim().length < 3) {
      setError("Name must be at least 3 characters long.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return false;
    }
    const phoneRegex = /^[\d\s()+-]+$/;
    if (!phoneRegex.test(phone)) {
      setError("Phone number contains invalid characters.");
      return false;
    }
    return true;
  };

  const executeSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!validateForm()) return;
    setLoading(true);

    try {
      let newUser;
      if (isEditing) {
        await api.patch(`/users/${id}`, userData);
        newUser = { ...userData, id };
        setUsers((prev) =>
          prev.map((user) => (user.id === id ? newUser : user))
        );
        toast.success("User updated successfully!");
      } else {
        const res = await api.post("/users", { ...userData, status: true });
        newUser = res.data;
        setUsers((prev) => [...prev, newUser]);
        toast.success("User added successfully!");
      }

      navigate("/");
      setUserData({ name: "", email: "", phone: "", image: "" });
    } catch {
      setError("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <h1 className="display-5 text-primary mb-4 text-center">
        {isEditing ? "Edit User" : "Add User"}
      </h1>

      {error && <p className="text-danger text-center">{error}</p>}

      <form onSubmit={executeSubmit} className="d-flex justify-content-center">
        <div
          className="signUp-container p-4"
          style={{
            width: "500px",
            borderRadius: "30px",
            backdropFilter: "blur(3px)",
            backgroundColor: "#ffffff",
          }}
        >
          {["name", "email", "phone", "image"].map((field) => (
            <div className="mb-3 form-floating" key={field}>
              <input
                type={
                  field === "email"
                    ? "email"
                    : field === "image"
                    ? "url"
                    : "text"
                }
                id={field}
                name={field}
                className="form-control"
                placeholder={`Enter your ${field}`}
                value={userData[field]}
                onChange={executeModifications}
                required
              />
              <label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            </div>
          ))}

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {isEditing ? "Update User" : "Add User"}
            </button>
          </div>
        </div>
      </form>

      <div className="mt-5">
        <UsersDataList users={users} setUsers={setUsers} />
      </div>
    </div>
  );
};

export default UserInputForm;
