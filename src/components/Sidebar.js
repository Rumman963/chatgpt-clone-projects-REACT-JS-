import React from 'react';
import './Sidebar.css';
import chatgptLogo from '../assets/chatgpt.svg';
import addIcon from '../assets/add-30.png';
import messageIcon from '../assets/message.svg';
import homeIcon from '../assets/home.svg';
import bookmarkIcon from '../assets/bookmark.svg';
import rocketIcon from '../assets/rocket.svg';

const Sidebar = ({ onNewChat, onQuickQuestion, currentView, onViewChange }) => {
  return (
    <div className="sidebar">
      <div className='upperSide'>
        <div className='upperSideTop'>
          <img src={chatgptLogo} alt="Logo" className='logo' />
          <span className="brand">ChatGPT</span>
        </div>

        <button className='midBtn' onClick={onNewChat}>
          <img src={addIcon} alt="new chat" className="addBtn"/>
          New Chat
        </button>
        
        <div className='upperSideBottom'>
          <button 
            className="query" 
            onClick={() => onQuickQuestion("What is Programming?")}
          >
            <img src={messageIcon} alt='Query'/>
            What is Programming?
          </button>
          <button 
            className="query" 
            onClick={() => onQuickQuestion("What is AI?")}
          >
            <img src={messageIcon} alt='Query'/>
            What is AI?
          </button>
        </div>
      </div>

      <div className="lowerSide">
        <div 
          className={`listItems ${currentView === 'home' ? 'active' : ''}`}
          onClick={() => onViewChange('home')}
        >
          <img src={homeIcon} alt="Home" className="listItemImg"/>
          Home
        </div>
        <div 
          className={`listItems ${currentView === 'saved' ? 'active' : ''}`}
          onClick={() => onViewChange('saved')}
        >
          <img src={bookmarkIcon} alt="Saved" className="listItemImg"/>
          Saved
        </div>
        <div 
          className={`listItems ${currentView === 'upgrade' ? 'active' : ''}`}
          onClick={() => onViewChange('upgrade')}
        >
          <img src={rocketIcon} alt="Upgrade" className="listItemImg"/>
          Upgrade to Pro
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 