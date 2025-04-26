import React from 'react';
import './Navbar.css';
import chatgptLogo from '../assets/chatgptLogo.svg';

const Navbar = ({ isDarkMode, onThemeToggle }) => {
  return (
    <nav className={`navbar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="navbar-brand">
        <img src={chatgptLogo} alt="ChatGPT Logo" className="navbar-logo" />
        <span className="navbar-title">ChatGPT Clone</span>
      </div>
      
      <div className="navbar-menu">
        <button className="nav-item" onClick={onThemeToggle}>
          {isDarkMode ? (
            <span role="img" aria-label="Light Mode">🌞</span>
          ) : (
            <span role="img" aria-label="Dark Mode">🌙</span>
          )}
        </button>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="nav-item">
          <span role="img" aria-label="GitHub">📚</span>
          Docs
        </a>
        <div className="nav-item premium-btn">
          <span role="img" aria-label="Premium">⭐</span>
          Upgrade to Pro
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 