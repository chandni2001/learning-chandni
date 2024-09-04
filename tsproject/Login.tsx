import React, { useState } from 'react';
import './Login.css'; // Import a CSS file for styling

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleLogin = () => {
    if (username && password) {
      setMessage('Login successful');
    } else {
      setMessage('Please enter both username and password');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <div className="input-group">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
          placeholder="Enter your username"
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          placeholder="Enter your password"
        />
      </div>
      <button onClick={handleLogin} className="login-button">
        Login
      </button>
      {message && <p className="login-message">{message}</p>}
    </div>
  );
};

export default Login;
