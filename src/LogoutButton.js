import React from 'react';
import './App.css';

const LogoutButton = ({onLogout}) => {
  return (
    <div className="logout-button-container">
        <button className='logout-button' onClick={onLogout}>
            Logout
        </button>
    </div>
  );
};

export default LogoutButton;