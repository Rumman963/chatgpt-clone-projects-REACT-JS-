import React, { useState, useRef, useEffect } from 'react';
import './Chat.css';
import userIcon from '../assets/user-icon.png';
import sendIcon from '../assets/send.svg';
import chatgptLogo from '../assets/chatgptLogo.svg';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import chatService from '../services/chatService';
import { generateResponse } from '../data/responses';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCodeBlock, setIsCodeBlock] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [savedConversations, setSavedConversations] = useState([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [error, setError] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedContent, setStreamedContent] = useState('');
  
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const profileMenuRef = useRef(null);

  // Mock user data (replace with actual user data from your authentication system)
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    profileImage: userIcon,
    role: "Free User",
    joinDate: "Member since Jan 2024",
    isPro: false
  };

  // Mock saved conversations
  const mockSavedConversations = [
    {
      id: 1,
      title: "AI Basics Discussion",
      date: "2024-01-15",
      preview: "Understanding fundamental concepts of AI..."
    },
    {
      id: 2,
      title: "Code Review Session",
      date: "2024-01-20",
      preview: "Reviewing React component structure..."
    }
  ];

  useEffect(() => {
    // Initialize saved conversations
    setSavedConversations(mockSavedConversations);
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate typing delay
    setTimeout(() => {
      // Generate response using local database
      const response = generateResponse(input);
      
      // Add assistant message
      const assistantMessage = {
        role: 'assistant',
        content: response.response,
        confidence: response.confidence
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentView('home');
    setInput('');
  };

  const handleQuickQuestion = async (question) => {
    setInput(question);
    const event = new Event('submit');
    handleSubmit(event);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCodeBlock = () => {
    setIsCodeBlock(!isCodeBlock);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // You can implement theme switching logic here
    document.body.classList.toggle('light-mode');
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
    // Clear messages, localStorage, redirect to login, etc.
  };

  const clearConversation = () => {
    setMessages([]);
    setInput('');
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleProfileUpdate = () => {
    // Implement profile update logic
    console.log("Update profile clicked");
  };

  const handleAccountSettings = () => {
    // Implement account settings logic
    console.log("Account settings clicked");
  };

  const handleUpgradeClick = () => {
    setShowUpgradeModal(true);
  };

  const handleSaveConversation = () => {
    if (!userData.isPro && savedConversations.length >= 2) {
      setShowUpgradeModal(true);
      return;
    }

    const newConversation = {
      id: Date.now(),
      title: `Conversation ${savedConversations.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      preview: messages.length > 0 ? messages[messages.length - 1].content.substring(0, 50) + "..." : "Empty conversation"
    };

    setSavedConversations([...savedConversations, newConversation]);
  };

  const handleDeleteSavedConversation = (id) => {
    setSavedConversations(savedConversations.filter(conv => conv.id !== id));
  };

  const handleLoadConversation = (id) => {
    // Implement loading saved conversation
    console.log("Loading conversation:", id);
  };

  return (
    <>
      <Navbar isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
      <div className={`chat-layout ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="profile-tab" onClick={toggleProfileMenu}>
          <div className="profile-icon">
            <img src={userData.profileImage} alt={userData.name} />
            <div className="online-status"></div>
          </div>
          {showProfileMenu && (
            <div className="profile-menu" ref={profileMenuRef}>
              <div className="profile-menu-header">
                <div className="profile-image-container">
                  <img src={userData.profileImage} alt={userData.name} />
                  <div className="profile-image-edit" onClick={handleProfileUpdate}>
                    <span>✏️</span>
                  </div>
                </div>
                <div className="profile-info">
                  <span className="profile-name">{userData.name}</span>
                  <span className="profile-email">{userData.email}</span>
                  <span className="profile-role">{userData.role}</span>
                  <span className="profile-join-date">{userData.joinDate}</span>
                </div>
              </div>
              <div className="profile-menu-items">
                {!userData.isPro && (
                  <button onClick={handleUpgradeClick} className="profile-button upgrade-button">
                    ⭐ Upgrade to Pro
                  </button>
                )}
                <button onClick={handleSaveConversation} className="profile-button">
                  💾 Save Conversation
                </button>
                <div className="saved-conversations">
                  <h3>Saved Conversations</h3>
                  {savedConversations.map(conv => (
                    <div key={conv.id} className="saved-conversation-item">
                      <div onClick={() => handleLoadConversation(conv.id)}>
                        <h4>{conv.title}</h4>
                        <p>{conv.preview}</p>
                        <span className="saved-date">{conv.date}</span>
                      </div>
                      <button 
                        onClick={() => handleDeleteSavedConversation(conv.id)}
                        className="delete-conversation"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={handleProfileUpdate} className="profile-button">
                  👤 Update Profile
                </button>
                <button onClick={handleAccountSettings} className="profile-button">
                  ⚙️ Account Settings
                </button>
                <button onClick={handleThemeToggle} className="profile-button">
                  {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
                </button>
                <button onClick={clearConversation} className="profile-button">
                  🗑️ Clear Conversation
                </button>
                <button onClick={handleLogout} className="profile-button danger">
                  🚪 Logout
                </button>
              </div>
            </div>
          )}
        </div>

        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
          <Sidebar 
            onNewChat={handleNewChat}
            onQuickQuestion={handleQuickQuestion}
            currentView={currentView}
            onViewChange={setCurrentView}
          />
        </div>

        <div className={`chat-container ${!isSidebarOpen ? 'expanded' : ''}`}>
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="welcome-message">
                <img src={chatgptLogo} alt="ChatGPT Logo" className="welcome-logo" />
                <h1>Welcome to ChatGPT</h1>
                <p>Start a conversation and explore the possibilities of AI</p>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role === 'user' ? 'user-message' : 
                  message.role === 'error' ? 'error-message' : 'assistant-message'}`}
              >
                <div className="message-content">
                  <div className="message-avatar">
                    <img 
                      src={message.role === 'user' ? userIcon : chatgptLogo} 
                      alt={message.role === 'user' ? 'User' : 'ChatGPT'}
                      className="avatar-image"
                    />
                  </div>
                  <div className="message-body">
                    <div className="message-header">
                      <span className="message-role">
                        {message.role === 'user' ? 'You' : 'ChatGPT'}
                      </span>
                      <span className="message-timestamp">
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </div>
                    <div className="message-text">
                      {message.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message assistant-message">
                <div className="message-content">
                  <div className="message-avatar">
                    <img src={chatgptLogo} alt="ChatGPT" className="avatar-image" />
                  </div>
                  <div className="message-body">
                    <div className="message-header">
                      <span className="message-role">ChatGPT</span>
                    </div>
                    <div className="message-text">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="error-notification">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="chat-input-form">
            <div className="input-container">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here... (Shift + Enter for new line)"
                disabled={isLoading}
                rows={1}
                className={isCodeBlock ? 'code-input' : ''}
              />
              <div className="input-buttons">
                <button
                  type="button"
                  onClick={toggleCodeBlock}
                  className={`code-toggle ${isCodeBlock ? 'active' : ''}`}
                  title="Toggle code formatting"
                >
                  <span>&lt;/&gt;</span>
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="send-button"
                  title="Send message"
                >
                  <img src={sendIcon} alt="Send" className="send-icon" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Upgrade Modal */}
        {showUpgradeModal && (
          <div className="modal-overlay" onClick={() => setShowUpgradeModal(false)}>
            <div className="upgrade-modal" onClick={e => e.stopPropagation()}>
              <h2>Upgrade to Pro</h2>
              <div className="pro-features">
                <h3>Pro Features Include:</h3>
                <ul>
                  <li>✓ Unlimited saved conversations</li>
                  <li>✓ Priority support</li>
                  <li>✓ Advanced AI features</li>
                  <li>✓ Custom AI models</li>
                  <li>✓ API access</li>
                </ul>
              </div>
              <div className="pricing">
                <div className="price">$19.99</div>
                <div className="period">per month</div>
              </div>
              <button className="upgrade-now-button" onClick={() => {
                // Implement upgrade logic
                console.log("Upgrading to pro...");
                setShowUpgradeModal(false);
              }}>
                Upgrade Now
              </button>
              <button className="close-modal" onClick={() => setShowUpgradeModal(false)}>
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Chat; 