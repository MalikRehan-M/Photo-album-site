import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const DashboardData = () => {
  const { authState } = React.useContext(AuthContext);
  const [allImages, setAllImages] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    // Fetch images
    axios
      .get("http://localhost:8080/images/", {
        headers: {
          "Content-Type": "application/json",
          authorization: authState.token,
        },
      })
      .then((res) => setAllImages(res.data))
      .catch((error) => console.error("Error fetching images:", error));

    // Fetch albums
    axios
      .get("http://localhost:8080/albums/", {
        headers: {
          "Content-Type": "application/json",
          authorization: authState.token,
        },
      })
      .then((res) => setAlbums(res.data))
      .catch((error) => console.error("Error fetching albums:", error));

    // Fetch Users
    axios
      .get("http://localhost:8080/users/all", {
        headers: {
          "Content-Type": "application/json",
          authorization: authState.token,
        },
      })
      .then((res) => setAllUsers(res.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [authState.token]);

  // Conditionally render the component based on authState.role
  if (authState.role !== 'admin') {
    return <div>You are not authorized to view this page.</div>;
  }

  return (
    <Grid container spacing={2}>
    <Grid item xs={12} sm={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Number of Images
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {allImages.length+albums.length}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Number of Albums
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {albums.length}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Number of Users
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {allUsers.length}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
  );
};

export default DashboardData;
