
import React, { useState } from 'react';
import '../Styles/LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:7777/user/login?username=${username}&password=${password}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      // Handle successful login here (e.g., save token, redirect)
      alert("Success full Login")
      console.log('Login successful:', data);
    } else {
      // Handle login failure here
      alert("Failed")
      console.error('Login failed');
    }
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        
      </div>
    </div>
  );
}

export default LoginPage;
