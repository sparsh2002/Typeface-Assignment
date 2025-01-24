import React from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Home() {
  return (
    <div style={{display:"flex", flexDirection:'column' , justifyContent:"center", alignItems:"center"}}>
      <h1 >Welcome to Dropbox App - Typeface</h1>
      <img width={1000} src="https://cfl.dropboxstatic.com/static/metaserver/static/images/logo_catalog/dropbox_opengraph_image%402x.png" />
      <br/>
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
