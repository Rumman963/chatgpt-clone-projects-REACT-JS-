import React, { useState, useEffect, useRef } from 'react';
import './Profile.css';
import userIcon from '../assets/user-icon.png';

const Profile = ({ user, onUpdateProfile }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    bio: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(userIcon);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName || '',
        email: user.email || '',
        bio: user.bio || ''
      }));
      if (user.profileImage) {
        setProfileImageUrl(user.profileImage);
      }
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation (only if changing password)
    if (formData.newPassword || formData.currentPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Current password is required';
      }
      
      if (!formData.newPassword) {
        newErrors.newPassword = 'New password is required';
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'Password must be at least 6 characters';
      }

      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    if (validateForm()) {
      try {
        // Create a FormData object to handle file upload
        const submitData = new FormData();
        Object.keys(formData).forEach(key => {
          submitData.append(key, formData[key]);
        });
        if (profileImage) {
          submitData.append('profileImage', profileImage);
        }

        // Here you would typically make an API call to your backend
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
        
        // Update the user data including the profile image
        onUpdateProfile({
          ...formData,
          profileImage: profileImageUrl // In a real app, this would be the URL from your backend
        });
        
        setIsEditing(false);
        setSuccessMessage('Profile updated successfully!');
        
        // Clear password fields
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      } catch (error) {
        setErrors({ submit: 'Update failed. Please try again.' });
      }
    }

    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    // Reset form data to user data
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName || '',
        email: user.email || '',
        bio: user.bio || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      setProfileImageUrl(user.profileImage || userIcon);
    }
    setProfileImage(null);
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          profileImage: 'Image size should be less than 5MB'
        }));
        return;
      }

      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          profileImage: 'Please upload an image file'
        }));
        return;
      }

      setProfileImage(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImageUrl(imageUrl);
      setErrors(prev => ({
        ...prev,
        profileImage: ''
      }));
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-title">
          <h2>Profile Settings</h2>
          <p>Manage your personal information and account settings</p>
        </div>
        <button 
          className="edit-toggle"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-avatar" onClick={handleImageClick}>
          <img src={profileImageUrl} alt="Profile" />
          {isEditing && (
            <div className="avatar-overlay">
              <span>Change Photo</span>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden-input"
          />
        </div>
        {errors.profileImage && (
          <div className="error-message text-center">{errors.profileImage}</div>
        )}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={!isEditing}
                className={errors.fullName ? 'error' : ''}
                placeholder="Enter your full name"
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={errors.email ? 'error' : ''}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Tell us about yourself"
                rows="4"
              />
            </div>
          </div>

          {isEditing && (
            <div className="form-section">
              <h3>Change Password</h3>
              <p className="section-description">Leave blank if you don't want to change your password</p>
              
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className={errors.currentPassword ? 'error' : ''}
                  placeholder="Enter current password"
                />
                {errors.currentPassword && <span className="error-message">{errors.currentPassword}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={errors.newPassword ? 'error' : ''}
                  placeholder="Enter new password"
                />
                {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'error' : ''}
                  placeholder="Confirm new password"
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>
          )}

          {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          {isEditing && (
            <div className="form-actions">
              <button type="button" onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="save-button">
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile; 