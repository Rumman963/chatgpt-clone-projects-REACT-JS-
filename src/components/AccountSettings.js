import React, { useState } from 'react';
import './AccountSettings.css';

const AccountSettings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState({
        username: 'JohnDoe',
        email: 'john.doe@example.com',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        chatGPTVersion: 'gpt-4',
        profileImage: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    profileImage: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="account-settings">
            <div className="settings-sidebar">
                <div className="profile-preview">
                    <div className="profile-image-container">
                        <img 
                            src={formData.profileImage || 'https://via.placeholder.com/150'} 
                            alt="Profile" 
                            className="profile-image"
                        />
                        <label className="change-image-btn">
                            Change Image
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                        </label>
                    </div>
                    <h3>{formData.username}</h3>
                    <p>{formData.email}</p>
                </div>
                <nav className="settings-nav">
                    <button 
                        className={activeTab === 'profile' ? 'active' : ''}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile Settings
                    </button>
                    <button 
                        className={activeTab === 'password' ? 'active' : ''}
                        onClick={() => setActiveTab('password')}
                    >
                        Password
                    </button>
                    <button 
                        className={activeTab === 'version' ? 'active' : ''}
                        onClick={() => setActiveTab('version')}
                    >
                        ChatGPT Version
                    </button>
                    <button 
                        className={activeTab === 'help' ? 'active' : ''}
                        onClick={() => setActiveTab('help')}
                    >
                        Help & Services
                    </button>
                </nav>
            </div>
            <div className="settings-content">
                <form onSubmit={handleSubmit}>
                    {activeTab === 'profile' && (
                        <div className="profile-settings">
                            <h2>Profile Settings</h2>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'password' && (
                        <div className="password-settings">
                            <h2>Change Password</h2>
                            <div className="form-group">
                                <label>Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'version' && (
                        <div className="version-settings">
                            <h2>ChatGPT Version</h2>
                            <div className="form-group">
                                <label>Select Version</label>
                                <select
                                    name="chatGPTVersion"
                                    value={formData.chatGPTVersion}
                                    onChange={handleInputChange}
                                >
                                    <option value="gpt-4">GPT-4 (Latest)</option>
                                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                                    <option value="gpt-3">GPT-3</option>
                                </select>
                            </div>
                            <div className="version-info">
                                <h3>Version Information</h3>
                                <p>GPT-4: Most advanced model with improved accuracy and capabilities</p>
                                <p>GPT-3.5 Turbo: Fast and efficient for most tasks</p>
                                <p>GPT-3: Standard version with good performance</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'help' && (
                        <div className="help-settings">
                            <h2>Help & Services</h2>
                            <div className="help-section">
                                <h3>Support</h3>
                                <p>Email: support@chatgpt.com</p>
                                <p>Phone: +1 (555) 123-4567</p>
                            </div>
                            <div className="help-section">
                                <h3>Documentation</h3>
                                <ul>
                                    <li>User Guide</li>
                                    <li>API Documentation</li>
                                    <li>FAQ</li>
                                </ul>
                            </div>
                            <div className="help-section">
                                <h3>Services</h3>
                                <ul>
                                    <li>API Access</li>
                                    <li>Custom Models</li>
                                    <li>Enterprise Solutions</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    <button type="submit" className="save-button">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AccountSettings; 