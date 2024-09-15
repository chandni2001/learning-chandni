import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserNotification from './UserNotification'; // User component

interface LoginProps {
  onLogin: (token: string) => void;
}

interface UserData {
  username: string;
  role: string;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userDetails, setUserDetails] = useState<UserData | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: username,
        password: password,
      });

      const token = response.data.jwt;

      const userResponse = await axios.get('http://localhost:1337/api/users/me?populate=*', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userRole = userResponse.data.role.name;
      const userName = userResponse.data.username;
      console.log(userName);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userResponse.data));
      onLogin(token);

      const userData: UserData = {
        username: userName,
        role: userRole,
      };
      console.log(userData);

      setUserDetails(userData);

      if (userRole === 'Manager') {
        navigate('/admin');
      } else if (userRole === 'Public' || userRole === 'Authenticated') {
        navigate('/users');
      } else {
        console.error('Unknown role:', userRole);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username or Email:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {userDetails && (userDetails.role === 'Public' || userDetails.role === 'Authenticated') && (
        <UserNotification username={userDetails.username} />
      )}
    </div>
  );
};

export default Login;