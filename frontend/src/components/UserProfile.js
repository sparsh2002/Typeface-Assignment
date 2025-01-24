import React, { useEffect, useState } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import api from '../api/api';

function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await api.get(`/users/${userId}/profile`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const handleViewFiles = () => {
    navigate(`/dashboard/users/${userId}/files`); // Redirect to files page
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div style={{display:"flex" ,flexDirection:'column' ,justifyContent:"center", alignItems:"center"}}>
    <h2 style={{display:"flex" , justifyContent:"center", alignItems:"center"}} >User Profile</h2>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 200 }}
        image="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {profile.username}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          I'm a software developer with experience in Python, AI/ML , Java springboot, MERN 
          and multiple cloud technologies
        </Typography>
      </CardContent>
      <CardActions>
        <Button  onClick={handleViewFiles} size="small">Files</Button>
        <Button size="small">Back To All Users</Button>
      </CardActions>
    </Card>
    </div>);
}

export default UserProfile;
