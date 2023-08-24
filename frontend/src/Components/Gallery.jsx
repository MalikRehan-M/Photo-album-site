import React, { useState } from "react";
import {
  Card,
  CardContent,
  Dialog,
  DialogContent,
  Typography,
  Grid,
  TextField, // Import TextField for user comments
  Button,    // Import Button for comment submission
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AuthContext } from "../Context/AuthContext";

const cardStyle = {
  cursor: "pointer",
};

const Gallery = () => {
  const {album,setAlbum}=React.useContext(AuthContext)
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [userComments, setUserComments] = useState(Array(album.length).fill('')); // Initialize user comments array

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setOpenDialog(true);
    setSelectedImageIndex(0);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCard(null);
  };

  const handleImageChange = (selectedIndex) => {
    setSelectedImageIndex(selectedIndex);
  };

  // Function to update user comments
  const handleCommentChange = (event, albumIndex) => {
    const newComments = [...userComments];
    newComments[albumIndex] = event.target.value;
    setUserComments(newComments);
  };

  // Function to handle comment submission (you can customize this)
  const handleCommentSubmit = (albumIndex) => {
    // You can send the comment to a server or store it in your app's state
    alert(`Comment for album ${albumIndex + 1}: ${userComments[albumIndex]}`);
  };

  return (
    <>
      <Grid container spacing={2} p={2}>
        {album.map((album, albumIndex) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={albumIndex} flexGrow={"auto"}>
            <Card style={cardStyle} onClick={() => handleCardClick(album)}>
              <CardContent sx={{ m: 12 }}>
                <Typography variant="h5">{album.albumTitle}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedCard && (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
          <DialogContent>
            <Typography variant="h6">{selectedCard.albumTitle}</Typography>
            <Carousel
              selectedItem={selectedImageIndex}
              onChange={handleImageChange}
            >
              {selectedCard.images.map((image, imageIndex) => (
                <div key={imageIndex}>
                  <img
                    src={image}
                    alt={`${imageIndex + 1}`}
                    style={{ maxWidth: "100%" }}
                  />
                  <Typography variant="body2" style={{ marginTop: "16px" }}>
                    {selectedCard.titles[imageIndex]}
                  </Typography>
                  <Typography variant="body2">
                    {selectedCard.captions[imageIndex]}
                  </Typography>
                  
                  {/* Text input for user comments */}
                  <TextField
                    label="Add your comment"
                    variant="outlined"
                    fullWidth
                    value={userComments[imageIndex]}
                    onChange={(event) => handleCommentChange(event, imageIndex)}
                    margin="normal"
                  />
                  
                  {/* Button to submit comments */}
                  <Button
                  sx={{mt:20}}
                    variant="contained"
                    color="primary"
                    onClick={() => handleCommentSubmit(imageIndex)}
                  >
                    Submit Comment
                  </Button>
                </div>
              ))}
            </Carousel>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};



export default Gallery;
