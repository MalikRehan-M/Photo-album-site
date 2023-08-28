import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const Gallery = () => {
  const { authState } = useContext(AuthContext);
  const [albums, setAlbums] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8080/albums/", {
        headers: {
          "Content-Type": "application/json",
          authorization: authState.token,
        },
      })
      .then((res) => {
        setAlbums(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching albums:", error);
      });
  }, [comments, authState.token]);
  const handleCarouselChange = (index) => {
    setSelectedImageIndex(index);
    setComments(selectedAlbum.images.comments || []);
  };

  const handleCardClick = (album) => {
    setSelectedAlbum(album);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedAlbum(null);
    setOpenModal(false);
    setNewComment("");
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    const data = {
      user:authState.name,
      comment:newComment
    }
    // console.log("comment",data);

    axios
      .post(
        `http://localhost:8080/albums/add-comment/${selectedAlbum._id}/${selectedImageIndex}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: authState.token,
          },
        }
      )
      .then((response) => {
        setComments([...comments, newComment]);
        setNewComment("");
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  return (
    <>
      <Grid container spacing={2} p={2}>
        {albums.map((album, albumIndex) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={album._id}>
            <Card
              style={{
                cursor: "pointer",
                backgroundImage: `url(${album.images[0].filename})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              onClick={() => handleCardClick(album)}
            >
              <CardContent sx={{ m: 12 }}>
                <Typography variant="h4" color="white">
                  {album.albumTitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for Slideshow */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          width: "50%",
          margin: "auto",
          height: "80%",
          overflow: "scroll",
          textAlign: "start",
        }}
      >
        <div style={{ backgroundColor: "white" }}>
          {selectedAlbum && (
            <Carousel
              autoPlay
              infiniteLoop
              interval={2000}
              useKeyboardArrows
              showArrows={false}
              renderIndicator={false}
              showThumbs={false}
              onChange={handleCarouselChange}
            >
              {selectedAlbum &&
                selectedAlbum.images.map((image, index) => (
                  <div key={index}>
                    <h2>Album: {selectedAlbum.albumTitle}</h2>
                    <div
                      style={{ width: "80%", height: "400px", margin: "auto" }}
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                        src={image.filename}
                        alt={image.caption}
                      />
                    </div>
                    {/* Comment Section */}
                    <div
                      style={{
                        marginTop: "5%",
                        textAlign: "start",
                        padding: "20px",
                      }}
                    >
                      <h2>Title: {image.title}</h2>
                      <h2>Caption: {image.caption}</h2>

                      <h3>Comments:</h3>
                      <ul>
                        {image.comments.map((comment, commentIndex) => (
                          <li key={commentIndex}>
                            <h4>{comment.user||authState.name}: {comment.comment||comment}</h4>
                          </li>
                        ))}
                      </ul>

                      <TextField
                        label="Add a Comment"
                        variant="outlined"
                        sx={{ width: "400px", height: "60px", padding: "10px" }}
                        value={newComment}
                        onChange={handleCommentChange}
                      />
                      <Button
                        sx={{ ml: 4, mt: 1 }}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleCommentSubmit();
                          image.comments = [...image.comments, newComment];
                        }}
                      >
                        Add Comment
                      </Button>
                    </div>
                  </div>
                ))}
            </Carousel>
          )}
        </div>
      </Modal>
    </>
  );
};
export default Gallery;

