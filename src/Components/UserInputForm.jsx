import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Services/api";
import UsersDataList from "./UsersDataList";

const UserInputForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isEditing) {
        setLoading(true);
        try {
          const res = await api.get(`/users/${id}`);
          // console.log("Fetched data:", res.data);
          const { name, email, phone, image } = res.data;
          setUserData({
            name: name || "",
            email: email || "",
            phone: phone || "",
            image: image || "",
          });
          setError(null);
        } catch (err) {
          if (err.response?.status === 404) {
            setError("User not found.");
          } else {
            setError("Failed to load user data for editing.");
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [id, isEditing]);

  const handleModifications = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const checkIfUserExists = async (email) => {
    try {
      const res = await api.get(`/users?email=${email}`);
      return res.data.length > 0; // If user exists, return true
    } catch (err) {
      setError("Error checking user existence.");
      return false; // If error in fetching, assume user doesn't exist
    }
  };

  const executeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isEditing) {
      const userExists = await checkIfUserExists(userData.email);
      if (userExists) {
        setError("A user with this email already exists.");
        setLoading(false);
        return;
      }
    }

    try {
      if (isEditing) {
        await api.patch(`/users/${id}`, userData);
      } else {
        await api.post("/users", { ...userData, status: true });
      }
      navigate("/");
    } catch (err) {
      setError("An error occurred while saving the data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container my-4">
      <h1 className="display-4 text-primary mb-4">
        {isEditing ? "Edit User" : "Add User"}
      </h1>

      {error && <p className="text-danger">{error}</p>}

      <form
        onSubmit={executeSubmit}
        className="d-flex justify-content-center align-items-center"
      >
        <div
          className="signUp-container"
          style={{
            padding: "10px 30px 30px 30px",
            width: "500px",
            borderRadius: "30px",
            backdropFilter: "blur(3px)",
            backgroundColor: "#ffffff",
          }}
        >
          <div className="mb-3 form-floating">
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              value={userData.name}
              onChange={handleModifications}
              required
            />
            <label htmlFor="name">Name</label>
          </div>

          <div className="mb-3 form-floating">
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={userData.email}
              onChange={handleModifications}
              required
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="mb-3 form-floating">
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control"
              placeholder="Enter your phone number"
              value={userData.phone}
              onChange={handleModifications}
            />
            <label htmlFor="phone">Phone Number</label>
          </div>

          <div className="mb-3 form-floating">
            <input
              type="url"
              id="image"
              name="image"
              className="form-control"
              placeholder="Enter the image URL"
              value={userData.image}
              onChange={handleModifications}
            />
            <label htmlFor="image">Image URL</label>
          </div>

          <button type="submit" className="btn btn-primary">
            {isEditing ? "Update User" : "Add User"}
          </button>
        </div>
      </form>

      <UsersDataList />
    </div>
  );
};

export default UserInputForm;
