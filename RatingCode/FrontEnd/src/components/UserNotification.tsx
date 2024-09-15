import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserNotification.css';

interface User {
  id: string;
  username: string;
}

const UserNotification: React.FC = () => {
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUserDetails = async () => {
        try {
          const userResponse = await axios.get(
            'http://localhost:1337/api/users/me?populate=*',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserDetails(userResponse.data);

          // Fetch all users
          const usersResponse = await axios.get('http://localhost:1337/api/users', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUsers(usersResponse.data);
        } catch (error) {
          console.error('Failed to fetch user details:', error);
        }
      };

      fetchUserDetails();
    } else {
      console.log('No token found in localStorage');
    }
  }, []);


  const handleCloseAlert = () => {
    setShowAlert(false);
    setAlertMessage('');
  };

  const handleSelectUser = (user: User) => {
    navigate('/assign-task', { state: { selectedUser: user } });
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="container">
      <div className="user-list-container">
        <h5 className="user-list-title">Select a User</h5>
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-list-item">
              <button
                className="user-list-button"
                onClick={() => handleSelectUser(user)}
              >
                {user.username}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button className="logout-button" onClick={logout}>
        Logout
      </button>

      {showAlert && (
        <div className={`alert ${alertType}`}>
          {alertMessage}
          <button className="alert-close" onClick={handleCloseAlert}>
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default UserNotification;
