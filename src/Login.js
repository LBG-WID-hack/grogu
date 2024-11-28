import React from 'react';
import './App.css';
import logo from '../src/assets/sw_logo_no_background.png'

const LoginPage = ({onLogin}) => {
  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <form className="login-form">
        <label htmlFor="email" className="login-label">Enter your email:</label>
        <input type="email" id="login-email" name="email" placeholder="Email" className="login-input" />

        <label htmlFor="password" className="login-label">Enter your password:</label>
        <input type="password" id="password" name="password" placeholder="Password" className="login-input" />

        <button type="submit" className="login-submit-button" onClick={onLogin}>Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;