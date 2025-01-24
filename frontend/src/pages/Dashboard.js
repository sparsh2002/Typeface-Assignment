import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Users from '../components/Users';
import UserProfile from '../components/UserProfile';
import UserFiles from '../components/UserFiles';

function Dashboard() {
  return (
    <div>
      <h1 style={{display:"flex" , justifyContent:"center", alignItems:"center"}}>Dashboard</h1>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId/profile" element={<UserProfile />} />
        <Route path="/users/:userId/files" element={<UserFiles />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
