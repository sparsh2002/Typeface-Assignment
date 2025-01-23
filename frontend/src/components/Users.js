import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';

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
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - <Link to={`/dashboard/users/${user.id}/profile`}>View Profile</Link>
          </li>
        ))}
      </ul>
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
      <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}>Next</button>
    </div>
  );
}

export default Users;
