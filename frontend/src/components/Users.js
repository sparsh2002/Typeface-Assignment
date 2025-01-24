import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    try {
      const response = await api.get(`/users/?page=${page}&per_page=10`);
      setUsers(response.data.users);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <div style={{display:'flex' , flexDirection:'column' , maxWidth: 500 , margin:'auto'}}>
      <h2 style={{display:"flex" , justifyContent:"center", alignItems:"center"}} >Users</h2>
      <List sx={{ margin:'auto', width: '100%', maxWidth: 500, bgcolor: 'background.paper' , boxShadow:2}}>
        {
          users.map(user => 
            <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" />
        </ListItemAvatar>
        <ListItemText
          primary={user.username}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: 'text.primary', display: 'inline' }}
              >
                <Link  style={{ all: 'unset', cursor: 'pointer' , color:'cornflowerblue'}} to={`/dashboard/users/${user.id}/profile`}>View Profile</Link>
              </Typography>
              
            </React.Fragment>
          }
        />
      </ListItem>

           )
        }
      
      </List>
      <div style={{display:'flex', justifyContent:'right', columnGap:10, marginTop:10}}>
        <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</Button>
        <Button variant="contained" onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}>Next</Button>
      </div>
      
    </div>
  );
}

export default Users;
