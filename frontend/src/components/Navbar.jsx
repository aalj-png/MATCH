import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">⚽ Match Manager</a>
        </div>
        <div className="nav-menu">
          {isAuthenticated ? (
            <>
              <span className="user-welcome">Welcome, {user.username}</span>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="nav-link">Login</a>
              <a href="/register" className="nav-link">Register</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
