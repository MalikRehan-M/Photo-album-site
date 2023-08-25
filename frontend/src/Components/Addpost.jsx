import * as React from "react";
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

export default function Addpost() {
  const {authState } = React.useContext(AuthContext);
  const [formData, setFormData] = React.useState({
    title: "",
    caption: "",
  });

  const [registrationModalOpen, setRegistrationModalOpen] =
    React.useState(false);
  const [image, setImage] = React.useState(null);
  const imageInput = React.useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
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

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddPost = () => {
    // Handle the logic to add a post using formData and image

    const post = {
      filename: image,
      title: formData.title,
      caption: formData.caption,
    };
    axios.post("https://tasty-seal-stockings.cyclic.cloud/images/add",post,{headers: {
      'Content-Type': 'application/json',
      "authorization": authState.token
    }})
    .then(res=>console.log(res))
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
      <Typography sx={{ mb: 4, fontSize: "28px" }}>Add Image</Typography>
      <form>
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
        <Box >
          <TextField
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
          sx={{mt:2}}
            name="caption"
            label="Caption"
            value={formData.caption}
            onChange={handleFormChange}
            fullWidth
          />
        </Box>
      </form>
      <Box display={"flex"} justifyContent={"center"} pt={2}>
        <Button onClick={handleAddPost}>Add Image</Button>
      </Box>
      <Dialog open={registrationModalOpen} onClose={handleReset}>
        <DialogTitle>Image Added</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your image has been added successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
