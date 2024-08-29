import React, { useState } from 'react';
import RegisterPage from './Components/RegisterPage';
import LoginPage from './Components/LoginPage';
import './Styles/RegisterPage.css';
import './Styles/LoginPage.css';
import './App.css'; // New CSS for switch design

function App() {
  const [isRegistered, setIsRegistered] = useState(false); // To track the state

  const handleSwitchToRegister = () => {
    setIsRegistered(false); // Switch to Register
  };

  const handleSwitchToLogin = () => {
    setIsRegistered(true); // Switch to Login
  };

  return (
    <div className="switch-container">
      <div className="switch-box">
        <div className="switch-tabs">
          <button 
            onClick={handleSwitchToRegister} 
            className={!isRegistered ? 'active-tab' : ''}>
            Register
          </button>
          <button 
            onClick={handleSwitchToLogin} 
            className={isRegistered ? 'active-tab' : ''}>
            Login
          </button>
        </div>

        {/* Show Register or Login based on isRegistered */}
        {!isRegistered ? (
          <RegisterPage />
        ) : (
          <LoginPage />
        )}
      </div>
    </div>
  );
}

export default App;
