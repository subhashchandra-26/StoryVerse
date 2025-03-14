import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card w-50">
        <div className="card-body">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
