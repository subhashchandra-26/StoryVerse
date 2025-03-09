import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ type }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('reader'); // Initialize role state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = type === 'login' ? '/api/auth/login' : '/api/auth/register';
      const payload = type === 'login' ? { username, password } : { username, password, role };

      // Log the payload for debugging
      console.log('Payload:', payload);

      const response = await axios.post(`http://localhost:5000${endpoint}`, payload);
      localStorage.setItem('token', response.data.token);

      if (type === 'register') {
        alert('Successfully registered');
      }

      // Log the role for debugging
      console.log('Role after submission:', role);

      // Navigate based on role
      navigate(role === 'author' ? '/author-dashboard' : '/');
    } catch (error) {
      console.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card w-50">
        <div className="card-body">
          <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
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
            {type === 'register' && (
              <div className="mb-3">
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => {
                    console.log('Selected role:', e.target.value); // Log the selected role
                    setRole(e.target.value);
                  }}
                >
                  <option value="reader">Reader</option>
                  <option value="author">Author</option>
                </select>
              </div>
            )}
            <button type="submit" className="btn btn-primary">
              {type === 'login' ? 'Login' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;