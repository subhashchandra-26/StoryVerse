import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    try {
      axios.post("https://storyverse-fpta.onrender.com/api/auth/login", {
        username,
        password,
      }).then((res) =>{
        console.log("login response",res)
        if(res.status===200){
          localStorage.setItem("token", res.data.token);
          const userRole = res.data.role; // Assuming backend sends { token, role }
          console.log("Logged-in User Role:", userRole)
          navigate(userRole === "author" ? "/author-dashboard" : "/");
        }
      })
    } catch (error) {
      console.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
  <div className="d-flex justify-content-center align-items-center min-vh-90 bg-light vh-100">
        <div className="card shadow p-4" style={{ width: "400px", borderRadius: "12px", maxWidth: "90vw" }}>
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
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
            {/* <div className="d-flex justify-content-between mb-3">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
            </div> */}
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
  );
};

export default LoginForm;
