import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

function UserFiles() {
  const { userId } = useParams();
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);

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

  const renderFilePreview = () => {
    if (!previewFile) return <p>Select a file to preview</p>;

    const extension = previewFile.file_name.split('.').pop().toLowerCase();
    const imageExtensions = ['jpg', 'png'];

    console.log(previewFile)

    if (imageExtensions.includes(extension)) {
      return (
        <div className="mt-4">
          <h3 className="font-bold">Image Preview</h3>
          <img 
            src={previewFile.url} 
            alt={previewFile.file_name} 
            className="max-w-full max-h-96 object-contain"
          />
        </div>
      );
    }

    // For other file types, provide download link
    return (
      <div className="mt-4">
        <a 
          href={previewFile.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:underline"
        >
          Download {previewFile.file_name}
        </a>
      </div>
    );
  };


  return (
    <div>
     <div>
          <h3 className="text-xl mb-2">File List</h3>
          <ul className="space-y-2">
            {files.map((f) => (
              <li 
                key={f.id} 
                className="flex items-center justify-between p-2 border rounded hover:bg-gray-100 cursor-pointer"
                onClick={() => setPreviewFile(f)}
              >
                <div className="flex items-center">
                  {/* {getFileIcon(f.file_name)} */}
                  {f.file_name}
                </div>
                <a 
                  href={f.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
      </div>
      <div>
          <h3 className="text-xl mb-2">File Preview</h3>
          {renderFilePreview()}
        </div>

        <form onSubmit={handleUpload} className="mt-4">
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])} 
          className="mb-2"
        />
        <button 
          type="submit" 
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default UserFiles;
