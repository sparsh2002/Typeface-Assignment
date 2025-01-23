import React, { useState } from 'react';
import api from '../api/api';

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
    <form onSubmit={handleSignup}>
      <input
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
