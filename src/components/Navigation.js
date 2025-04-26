import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-links">
        <Link 
          to="/chat" 
          className={`nav-link ${location.pathname === '/chat' ? 'active' : ''}`}
        >
          Chat
        </Link>
        <Link 
          to="/profile" 
          className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
        >
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navigation; 