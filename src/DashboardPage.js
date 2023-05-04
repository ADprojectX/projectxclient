import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const history = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem('isAuthenticated');
    history.replace('/login');
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard</p>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}

export default DashboardPage;
