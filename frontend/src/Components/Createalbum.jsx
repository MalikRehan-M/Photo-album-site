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

let cloudinaryInfo = {
  cloud_name: "dpuajbfaw",
  upload_preset: "ml_default",
};

export default function Createalbum() {
  const [formData, setFormData] = useState({
    title: "",
    caption: "", // Changed 'captions' to 'caption'
  });
  const [albumtitle,setAlbumTitle]=useState("")

  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [image, setImage] = useState(null);

  const [albumMode, setAlbumMode] = useState(false); // Added album mode state
  const [album, setAlbum] = useState([]); // Added album state
  const imageInput = React.useRef(null);
  
  const [captions,setCaptions]=useState([])
  const [titles,setTiltes]=useState([])
  const [albumImages,setAlbumImages]=useState([])

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
    // Here, you would make an API call to send the album data to your backend
    // You'll need to implement this API on the backend (see below)
    // After posting, you can clear the album state if needed
    // For now, let's assume you are sending the album to the server and clearing it
    // axios.post("/api/albums", { album })
    //   .then((response) => {
    //     setAlbum([]);
    //   })
    //   .catch((error) => {
    //     console.error("Error posting album:", error);
    //   });
  };


  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddPost = () => {
    const post = { ...formData, image };
    setAlbum([...album, post]);
    setFormData({
      albumTitle:albumtitle,
      images:"",
      titles: "",
      captions: "", // Changed 'captions' to 'caption'
    });
    setImage(null);
    setRegistrationModalOpen(true);
  };

  const handleReset = () => {
    setFormData({
      title: "",
      caption: "", // Changed 'captions' to 'caption'
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
  width: "65%",
  margin: "auto",
  mt: 5,
  p: "3%",
  borderRadius: "12px",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
}}
>
<Typography sx={{ mb: 4, fontSize: "28px" }}>
  {albumMode ? "Album" : "Add Post"}
</Typography>
{albumMode ? (
  // Display the album when in "view album" mode
  <Box>
    {album.map((post, index) => (
      <Box key={index} mb={2}>
        <Avatar
          variant="rounded"
          sx={{ height: "180px", width: "190px" }}
          src={post.image}
        />
        <Typography>{post.title}</Typography>
        <Typography>{post.caption}</Typography>
      </Box>
    ))}
    <Box display="flex" justifyContent="center" pt={2}>
      <Button onClick={handlePostAlbum}>Post Album</Button>
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
                  opacity: "55%",
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
              src={image ?? "../Images/Education_31-60_743.jpg"}
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
        <Box width="60%">
        <TextField
            name="albumtitle"
            label="Album Title"
            // value={formData.title}
            onChange={(e)=>{setAlbumTitle(e.target.value)}}
            fullWidth
          />
          <TextField
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
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
  <DialogTitle>Post Added</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Your post has been added successfully!
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleReset}>Close</Button>
  </DialogActions>
</Dialog>
</Box>
);
}

