import React, { useState } from 'react';
import api from '../api/api';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Signup() {
  const [user, setUser] = useState({ username: '', password: '', email: '' });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', user);
      alert('User registered successfully!');
    } catch (error) {
      alert('Error signing up');
    }
  };

  return (
    <Card style={{width:550 , height:370 , margin:'auto', marginTop:'30vh'}}>
      <CardContent>
    <form onSubmit={handleSignup} style={{display:'flex' , flexDirection:"column" , width:500, rowGap:18}}>
      <TextField id="outlined-basic" label="Username" variant="outlined"
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <TextField id="outlined-basic" label="Email" variant="outlined"
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <TextField id="outlined-basic" label="Password" variant="outlined"
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <Button variant="contained" type="submit">Signup</Button>
    </form>
    <br/>
        <Button href='/login' style={{float:'right', marginRight:10}} >Login?</Button>
    </CardContent>
    </Card>
  );
}

export default Signup;
