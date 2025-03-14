import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Lock, Users } from "lucide-react";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("reader");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://storyverse-fpta.onrender.com/api/auth/register", {
        username,
        password,
        role,
      });

      localStorage.setItem("token", response.data.token);
      alert("Successfully registered");
      navigate(role === "author" ? "/author-dashboard" : "/");
    } catch (error) {
      console.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div
      className="card shadow p-4 d-flex flex-column align-items-center"
      style={{ width: "400px", borderRadius: "12px", maxWidth: "90vw" }}
    >
      <h3 className="text-center mb-4">Register</h3>

      {/* {error && <div className="alert alert-danger">{error}</div>} */}

      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        {/* Username Field */}
        <div className="mb-3 input-group">
          <span className="input-group-text bg-white">
            <User size={18} />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-3 input-group">
          <span className="input-group-text bg-white">
            <Lock size={18} />
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Role Selection */}
        <div className="mb-3 input-group">
          <span className="input-group-text bg-white">
            <Users size={18} />
          </span>
          <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="reader">Reader</option>
            <option value="author">Author</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100" >
          submit
        </button>
      </form>
    </div>
  </div>
  );
};

export default RegisterForm;
