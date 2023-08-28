import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Avatar,
  Badge,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

let cloudinaryInfo = {
  cloud_name: "dpuajbfaw",
  upload_preset: "ml_default",
};

export default function Createalbum() {
  const { authState } = React.useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    caption: "",
  });
  const [albumtitle, setAlbumTitle] = useState("");

  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [filename, setImage] = useState(null);

  const [albumMode, setAlbumMode] = useState(false); // Added album mode state
  const [album, setAlbum] = useState([]); // Added album state
  const imageInput = React.useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    // Your cloudinary upload logic here
    let cloud_name = cloudinaryInfo.cloud_name;
    let upload_preset = cloudinaryInfo.upload_preset;
    let formData1 = new FormData();
    formData1.append("file", file);
    formData1.append("upload_preset", upload_preset);

    let link = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData1
    );
    link = link.data;
    setImage(link.secure_url);
  };

  const handlePostAlbum = () => {
    let obj = { albumTitle: albumtitle, images: album };
    axios
      .post("http://localhost:8080/albums/add", obj, {
        headers: {
          "Content-Type": "application/json",
          authorization: authState.token,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error posting album:", error);
      });
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddPost = () => {
    const post = { ...formData, comments: [], filename };
    setAlbum([...album, post]);
    console.log(album);
    setFormData({
      titles: "",
      caption: "",
    });
    setImage(null);
    setRegistrationModalOpen(true);
  };

  const handleReset = () => {
    setFormData({
      title: "",
      caption: "",
    });
    setImage(null);
    setRegistrationModalOpen(false);
  };

  const toggleAlbumMode = () => {
    setAlbumMode(!albumMode);
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "35%",
        margin: "auto",
        mt: 5,
        p: "3%",
        borderRadius: "12px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <Typography sx={{ mb: 4, fontSize: "38px" }}>Create Album</Typography>
      {albumMode ? (
        // Display the album when in "view album" mode
        <Box>
          {album.map((post, index) => (
            <Box key={index} mb={2} display={"flex"} gap={"20px"}>
              <Avatar
                variant="rounded"
                sx={{ height: "180px", width: "190px" }}
                src={post.filename}
              />
              <Box>
                <Typography variant="h6">Title: {post.title}</Typography>
                <Typography variant="h6">Caption: {post.caption}</Typography>
              </Box>
            </Box>
          ))}
          <Box display="flex" justifyContent="center" pt={2}>
            <Button onClick={handlePostAlbum}>Upload Album</Button>
          </Box>
        </Box>
      ) : (
        // Display the form when not in "view album" mode
        <form>
          {/* ... (your form input fields) */}
          <Box>
            <Badge
              overlap="circular"
              sx={{ position: "relative" }}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <Cancel
                  sx={{
                    color: "red",
                    opacity: "35%",
                    position: "absolute",
                    bottom: "120px",
                    fontSize: "30px",
                    cursor: "pointer",
                  }}
                  titleAccess="Remove Image"
                  onClick={handleRemoveImage}
                />
              }
            >
              <Avatar
                variant="rounded"
                sx={{ height: "180px", width: "190px" }}
                src={filename ?? "../Images/Education_31-60_743.jpg"}
              />
            </Badge>
            <Box>
              <label>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={imageInput}
                  onChange={handleImageChange}
                  zIndex="1000"
                />
                <Button
                  w="100%"
                  onClick={() => {
                    imageInput.current.click();
                  }}
                >
                  Change Photo
                </Button>
              </label>
            </Box>
          </Box>
          <Box>
            <TextField
              name="albumtitle"
              label="Album Title"
              value={albumtitle}
              onChange={(e) => {
                setAlbumTitle(e.target.value);
              }}
              fullWidth
            />
            <TextField
              sx={{ mt: 2 }}
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              sx={{ mt: 2 }}
              name="caption"
              label="Caption"
              value={formData.caption}
              onChange={handleFormChange}
              fullWidth
            />
          </Box>
          <Box display="flex" justifyContent="center" pt={2}>
            <Button onClick={handleAddPost}>
              {album.length === 0 ? "Add Post" : "Add to Album"}
            </Button>
          </Box>
        </form>
      )}
      <Box display="flex" justifyContent="center" pt={2}>
        <Button onClick={toggleAlbumMode}>
          {albumMode ? "Add Post" : "View Album"}
        </Button>
      </Box>
      <Dialog open={registrationModalOpen} onClose={handleReset}>
        <DialogTitle>Image Added</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your Image has been uploaded successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
