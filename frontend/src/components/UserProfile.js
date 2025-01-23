import React, { useEffect, useState } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import api from '../api/api';

function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

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
    <div>
      <h2>Profile</h2>
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <button onClick={handleViewFiles}>View Files</button>
    </div>
  );
}

export default UserProfile;
