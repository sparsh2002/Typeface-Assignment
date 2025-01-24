import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Users from '../components/Users';
import UserProfile from '../components/UserProfile';
import UserFiles from '../components/UserFiles';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  function logOut(){
    localStorage.removeItem('accessToken')
    navigate('/login');
  }
  return (
    <div>
      {/* <div style={{display:'flex' ,justifyContent:"center", alignItems:"center"}}> */}
      <h1 style={{display:"flex" , justifyContent:"center", alignItems:"center"}}>Dashboard</h1>
      <Button onClick={() => logOut()} variant='contained' color="error" style={{position:'absolute' ,top:0,right:10}}>Log Out</Button>
      {/* </div> */}
      
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId/profile" element={<UserProfile />} />
        <Route path="/users/:userId/files" element={<UserFiles />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
