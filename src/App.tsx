import React, { useEffect, useState, JSX } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AdminNavbar from './components/AdminNavbar/AdminNav';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Jobs from './pages/Job/Job';
import Profile from './pages/Profile/Profile';
import AdminHome from './pages/Admin/Home/AdminHome';
import AdminJob from "./pages/Admin/Jobs/Job";
import { logout } from './services/authService';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
      setIsAuthenticated(true);
      setIsAdmin(role === 'ADMIN');
    }
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      {isAdmin ? (
        <AdminNavbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      ) : (
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      )}
      <Routes>
      <Route path="/" element={<Navigate to={isAdmin ? "/adminHome" : "/home"} />} />
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
        <Route path="/adminHome" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
        <Route path="/adminjob" element={<ProtectedRoute><AdminJob /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;