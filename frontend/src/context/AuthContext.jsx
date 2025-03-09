import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if the user is already logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Authentication failed:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      navigate(response.data.user.role === 'author' ? '/author-dashboard' : '/');
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || 'An error occurred');
      throw error;
    }
  };

  const register = async (username, password, role) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, password, role });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      navigate(role === 'author' ? '/author-dashboard' : '/');
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || 'An error occurred');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);