import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Chat from './components/Chat';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    // Here you would typically validate the user with your backend
    setUser({
      id: '1',
      email: userData.email,
      fullName: 'John Doe', // This would come from your backend
      bio: ''
    });
  };

  const handleUpdateProfile = (profileData) => {
    setUser(prev => ({
      ...prev,
      ...profileData
    }));
  };

  return (
    <Router>
      <div className="app">
        {user && <Navigation />}
        <Routes>
          <Route 
            path="/login" 
            element={
              !user ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/chat" replace />
              )
            } 
          />
          <Route 
            path="/chat" 
            element={
              user ? (
                <Chat user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/profile" 
            element={
              user ? (
                <Profile user={user} onUpdateProfile={handleUpdateProfile} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to={user ? "/chat" : "/login"} replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

