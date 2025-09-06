import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

// Describe what this PR does so that reviewer can understand the purpose of the code
// From what I can tell, this is a dashboard component that gets and displays profile, notifications or settings.
// I would argue that these have to be separated into separate components. A good structure would be dashboard having child components profile, notifications and settings.
// If there's any HTML block that is more easily configured on the Dashboard level, use React composition to your advantage - <Profile> some HTML block </Profile>

const UserDashboard = ({ userId, onUserUpdate }) => {
  // Props should have types - and what if these are undefined? Maybe you can add default behaviours?
  const [user, setUser] = useState({});
  const [notifications, setNotifications] = useState([]); // If the component is separated into Dashboard and 3 children components, this can be a part of the notifications component
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [activeTab, setActiveTab] = useState("profile"); // Using enums for static values can never hurt! In this case, you would have "proile", "notifications" and "settings" under the same enum name.
  const [formData, setFormData] = useState({}); // No need to use state for formData
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // submitting a form seems like something we might do often throughout the application. How about refactoring this into a custom hook so that the logic is reusable?
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const intervalRef = useRef(null);
  // As a general rule of thumb, always have types for states - user, notifications, etc should have types, otherwise we don't know what it consists of

  // Fetch user data
  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // Set up online status monitoring
  useEffect(() => {
    // This can be separated into a custom hook to use online/offline logic elsewhere.
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Auto-refresh notifications every 30 seconds
  useEffect(() => {
    if (isOnline) {
      intervalRef.current = setInterval(() => {
        // Is there any reason why you're using .current of a ref to define setInterval? Can this not be just a variable? -> oh that's because we want this to persist through re-renders
        fetchNotifications(); // Can memoize this
      }, 30000); // This 30000 should be a constant
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isOnline]);

  const fetchUserData = async () => {
    // This can be handled using react-query for simplicity.
    // But if the application doesn't support react-query, then you can use custom hooks to fetch user data if it gets used elsewhere.
    // If it doesn't get used anywhere else, you can still define this within useEffect and clean it up
    try {
      const response = await axios.get(`/api/users/${userId}`);
      setUser(response.data);
      setFormData(response.data);
      // Using state for formData wouldn't change your functionality, but it doesn't seem like you're using current formdata values every time the input changes.
      // In that case, you can just work with the form data upon submission instead of tracking it with a state
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`/api/users/${userId}/notifications`);
      setNotifications(response.data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    // Try sanitizing the form in case of XSS attacks - malicious javascript code can be injected into the code
    const errors = {};

    // Are these all the cases of formData errors? What if formData is null? What if age isn't there?
    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (formData.age && (formData.age < 18 || formData.age > 120)) {
      errors.age = "Age must be between 18 and 120";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.put(`/api/users/${userId}`, formData);
      setUser(response.data);
      setLastUpdated(new Date());

      if (onUserUpdate) {
        onUserUpdate(response.data);
      }

      // Show success message
      alert("Profile updated successfully!");
    } catch (error) {
      if (error.response?.status === 409) {
        alert("Email already exists. Please choose a different email.");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true } // It's a little unclear if this isRead is a newly added field or if you're changing an existing one. Try adding a proper type to notification to make that obvious.
          : notification
      )
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== notificationId)
    );
  };

  // Could be a part of utils functions
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  // Memoize this function - unless notifications changes, this will not re-calculate upon re-render
  const getUnreadCount = () => {
    return notifications.filter((n) => !n.isRead).length;
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user.name || "User"}</h1>
        <div className="status-indicators">
          <span className={`status ${isOnline ? "online" : "offline"}`}>
            {isOnline ? "Online" : "Offline"}
          </span>
          <span className="last-updated">
            Last updated: {formatDate(lastUpdated)}
          </span>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="sidebar">
          <nav className="tabs">
            <button
              className={activeTab === "profile" ? "active" : ""}
              onClick={() => handleTabClick("profile")}
            >
              Profile
            </button>
            <button
              className={activeTab === "notifications" ? "active" : ""}
              onClick={() => handleTabClick("notifications")}
            >
              Notifications ({getUnreadCount()})
            </button>
            <button
              className={activeTab === "settings" ? "active" : ""}
              onClick={() => handleTabClick("settings")}
            >
              Settings
            </button>
          </nav>
        </div>

        <div className="main-content">
          {activeTab === "profile" && (
            <div className="profile-section">
              <h2>Edit Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    className={validationErrors.name ? "error" : ""}
                  />
                  {validationErrors.name && (
                    <span className="error-message">
                      {validationErrors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    className={validationErrors.email ? "error" : ""}
                  />
                  {validationErrors.email && (
                    <span className="error-message">
                      {validationErrors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age || ""}
                    onChange={handleInputChange}
                    className={validationErrors.age ? "error" : ""}
                  />
                  {validationErrors.age && (
                    <span className="error-message">
                      {validationErrors.age}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="notifications-section">
              <h2>Notifications</h2>
              <div className="notifications-list">
                {notifications.length === 0 ? (
                  <p>No notifications</p>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`notification ${
                        notification.isRead ? "read" : "unread"
                      }`}
                    >
                      <div className="notification-content">
                        <h4>{notification.title}</h4>
                        <p>{notification.message}</p>
                        <span className="notification-date">
                          {formatDate(notification.createdAt)}
                        </span>
                      </div>
                      <div className="notification-actions">
                        {!notification.isRead && (
                          <button
                            onClick={() =>
                              markNotificationAsRead(notification.id)
                            }
                            className="mark-read-btn"
                          >
                            Mark as Read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="settings-section">
              <h2>Settings</h2>
              <p>Settings coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Always a good practice to have an error boundary so that the whole page doesn't go down with an error.

export default UserDashboard;
