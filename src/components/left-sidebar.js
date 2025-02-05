import React from 'react';
import { Link } from 'react-router-dom';

const LeftSidebar = () => {
  return (
    <aside className="left-sidebar">
      <div className="sidebar-item">
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <div className="sidebar-item">
        <Link to="/notifications">Notifications</Link>
      </div>
      <div className="sidebar-item">
        <Link to="/profile">Profile</Link>
      </div>
    </aside>
  );
};

export default LeftSidebar;
