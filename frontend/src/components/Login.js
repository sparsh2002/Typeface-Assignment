import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', credentials);
      localStorage.setItem('accessToken', response.data.access_token);
      navigate('/dashboard/users');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <Card style={{width:550 , height:320 , margin:'auto', marginTop:'30vh'}}>
      <CardContent>
        <form onSubmit={handleLogin} style={{display:'flex' , flexDirection:"column" , width:500, rowGap:18}}>
          <TextField id="outlined-basic" label="Username" variant="outlined" type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
          <TextField id="outlined-basic" label="Password" variant="outlined"  type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
          <br />
          <Button variant="contained" type="submit">Login</Button>
        </form>
        <br/>
        <Button href='/signup' style={{float:'right', marginRight:10}} >SignUp?</Button>
      </CardContent>
    </Card>
    
  );
}

export default Login;
