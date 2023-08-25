import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { AuthContext } from '../Context/AuthContext';

const Addalbum = () => {
  const {authState } = React.useContext(AuthContext);
  const [allImages, setAllImages] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editedImage, setEditedImage] = useState(null); // State for edited image
  const [openEditDialog, setOpenEditDialog] = useState(false); // State to control edit dialog

  // Function to open the edit dialog
  const handleEditClick = (image) => {
    setEditedImage(image);
    setOpenEditDialog(true);
  };

  // Function to handle editing an image
  const handleEditImage = () => {
    // console.log(editedImage)
    if (editedImage) {
      axios
        .put(`http://localhost:8080/images/${editedImage._id}`, editedImage, {
          headers: {
            'Content-Type': 'application/json',
            authorization: authState.token,
          },
        })
        .then((res) => {
          console.log('Image edited:', res.data);
          setOpenEditDialog(false);
        })
        .catch((error) => console.error('Error editing image:', error));
    }
  };
  const handleDeleteImage = (imageId) => {
    axios
      .delete(`http://localhost:8080/images/${imageId}`, {
        headers: {
          authorization: authState.token,
        },
      })
      .then((res) => {
        console.log('Image deleted:', res.data);
        setAllImages((prevImages) => prevImages.filter((image) => image._id !== imageId));
      })
      .catch((error) => console.error('Error deleting image:', error));
  };

  useEffect(() => {
    // Fetch images
    console.log(authState.role)
    axios
      .get('http://localhost:8080/images/',{headers: {
        'Content-Type': 'application/json',
        "authorization": authState.token
      }})
      .then((res) => setAllImages(res.data))
      .catch((error) => console.error('Error fetching images:', error));

    // Fetch albums
    axios
      .get('http://localhost:8080/albums/',{headers: {
        'Content-Type': 'application/json',
        "authorization": authState.token
      }})
      .then((res) => setAlbums(res.data))
      .catch((error) => console.error('Error fetching albums:', error));
  }, [authState.token]);

  const handleAddToAlbum = () => {
    
    if (selectedAlbum && selectedImage) {
      axios
        .post(`http://localhost:8080/albums/add-imagetoalbum/${selectedAlbum}`, selectedImage,{headers: {
          'Content-Type': 'application/json',
          "authorization": authState.token
        }})
        .then((res) => {
          console.log('Image added to album:', res.data);
          setOpenDialog(false);
        })
        .catch((error) => console.error('Error adding image to album:', error));
    }
    console.log(selectedImage)
  };
  

  return (
    <div className="grid-container"> 
      {allImages.map((image) => (
        <Card key={image.id} style={{ margin: '10px' }}>
          <CardContent>
          
            <img src={image.filename} alt={image.title} style={{width:"250px",height:"200px",objectFit:"scale-down"}} />
            <h4>Title: {image.title}</h4>
            <h4>Caption: {image.caption}</h4>
            {authState.role === 'admin' && (
              <Button variant="contained" color="primary" onClick={() => {handleEditClick(image)}}>
                Edit
              </Button>
            )}
            {authState.role === 'admin' && (
              <Button sx={{marginLeft:1,backgroundColor:"red"}} variant="contained" color="primary" onClick={() => {handleDeleteImage(image._id)}}>
                Delete
              </Button>
            )}
            <Button
            sx={{marginLeft:1}}
              variant="contained"
              color="secondary"
              onClick={() => {
                setSelectedImage(image);
                setOpenDialog(true);
              }}
            >
              Add to Album
            </Button>
          </CardContent>
        </Card>
      ))}
   
      <style jsx>{`
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
          gap: 20px;
        }
      `}</style>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add to Album</DialogTitle>
        <DialogContent>
          <p>Select an album to add the image to:</p>
          <Select
            value={selectedAlbum}
            onChange={(e) => setSelectedAlbum(e.target.value)}
            style={{ width: '100%' }}
          >
            {albums.map((album) => (
              <MenuItem key={album.id} value={album._id}>
                {album.albumTitle}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddToAlbum} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} >
        <DialogTitle>Edit Image</DialogTitle>
        <DialogContent sx={{p:10}}>
          {/* Input fields for editing */}
          <TextField
          sx={{mt:2}}
            label="Title"
            value={editedImage?.title || ''}
            onChange={(e) => setEditedImage({ ...editedImage, title: e.target.value })}
            fullWidth
          />
          <TextField
          sx={{mt:2}}
            label="Caption"
            value={editedImage?.caption || ''}
            onChange={(e) => setEditedImage({ ...editedImage, caption: e.target.value })}
            fullWidth
          />
       
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditImage} color="primary" variant="contained">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Addalbum;
