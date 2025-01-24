import React from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Home() {
  return (
    <div>
      <h1 style={{display:"flex" , justifyContent:"center", alignItems:"center"}}>Welcome to Dropbox App - Typeface</h1>
      <div style={{
        display:"flex" , 
        flexDirection:'column' ,
        justifyContent:"center", 
        alignItems:"center",
        rowGap:10
        }} >
        <Button style={{width:100}} variant="contained"><Link style={{ all: 'unset', cursor: 'pointer' }} to="/login">Login</Link></Button>
        <Button style={{width:100}} variant="outlined"><Link  style={{ all: 'unset', cursor: 'pointer' }} to="/signup">Signup</Link></Button>
      </div>
    </div>
  );
}

export default Home;
