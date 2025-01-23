import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

function UserFiles() {
  const { userId } = useParams();
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  const fetchFiles = async () => {
    try {
      const response = await api.get(`/users/${userId}/files`);
      setFiles(response.data.files);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(file)
    formData.append('file', file, file.name);
    console.log(formData.has('file'));
    console.log(formData.get('file'));
    console.log(formData)

    try {
      await api.post(`/users/${userId}/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('File uploaded successfully');
      fetchFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [userId]);

  return (
    <div>
      <h2>User Files</h2>
      <ul>
        {files.map((f) => (
          <li key={f.id}>
            {f.file_name} - <a href={f.url} target="_blank" rel="noopener noreferrer">View</a>
          </li>
        ))}
      </ul>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UserFiles;
