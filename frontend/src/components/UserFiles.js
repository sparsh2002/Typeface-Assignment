import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Input from '@mui/material/Input';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function UserFiles() {
  const { userId } = useParams();
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [fileDetails, setFileDetails] = useState(null)

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));
  

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

  async function getFileUrl(){
    if(previewFile!=null){
      const response =  await api.get(`/users/${userId}/files/${previewFile.id}`);
      console.log(response.data)
      setFileDetails(response.data)
    }
  }
  useEffect( ()=>{
    getFileUrl()
    
  }, [previewFile])

  const renderFilePreview = () => {
    if (!previewFile) return <p>Select a file to preview</p>;

    const extension = previewFile.file_name.split('.').pop().toLowerCase();
    const imageExtensions = ['jpg', 'png'];

    console.log(previewFile)
    console.log(fileDetails)

    if (imageExtensions.includes(extension)) {
      return (
        <div className="mt-4">
          <h3 className="font-bold">Image Preview</h3>
          <img 
            width={400}
            src={fileDetails?.url} 
            alt={previewFile.file_name} 
            className="max-w-20 max-h-10"
          />
        </div>
      );
    }

    // For other file types, provide download link
    return (
      <div className="mt-4">
        <a 
          href={fileDetails.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:underline"
        >
          Download {previewFile.file_name}
        </a>
      </div>
    );
  };

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);


  return (
    <div style={{margin:'auto', width:'50vw'}}>
     <div>
          <h3 className="text-xl mb-2">User Files</h3>
          <Grid item xs={12} md={6}>
          <Demo>
            <List dense={dense}>
              {files.map(f => <ListItem
                  onClick={() => {
                    setPreviewFile(f) 
                  }}
                  secondaryAction={
                    <IconButton   href={f.url}  edge="end" aria-label="delete">
                      <RemoveRedEyeIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={f.file_name}
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>) 
              }
            </List>
          </Demo>
        </Grid>
          
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
        <Button 
          variant='contained'
          type="submit" 
        >
          Upload
        </Button>
      </form> 
      {/* <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput
        type="file"
        onChange={(e) => setFile(e.target.files[0])} 
        multiple
      />
    </Button> */}
    </div>
  );
}

export default UserFiles;
