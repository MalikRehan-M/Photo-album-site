import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LockOutlined } from "@mui/icons-material";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function Dashboard() {
  let navigate = useNavigate();
  
const { loginUser } = useContext(AuthContext);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    // console.log(authState.token)
    try {
      const res = await axios.post("http://localhost:8080/users/login", {
        email: loginFormData.email,
        password: loginFormData.password,
      });

      loginUser(res.data.token, res.data.role,res.data.user);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/users/register", {
        email: registerFormData.email,
        name: registerFormData.name,
        password: registerFormData.password,
        role:"user"
      });

      console.log(res.data); // Handle registration success
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleRegisterInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterFormData({
      ...registerFormData,
      [name]: value,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{marginLeft:"200px",gap:"20px"}}>

      
      <Grid container component="main" sx={{ height: "73.5vh" }}>
        {/* ... */}
        <Grid
          bgcolor={"white"}
          padding={"1rem"}
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 6,
              mx: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "1rem",
              bgcolor: "whitesmoke",
              borderRadius: "1.5rem",
              boxShadow:
                "{'0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)'}",
            }}
          >
            {/* ... */}
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Typography component="h6" variant="h6" color={"gray"}>
              Get access to your account
            </Typography>
            <br />
            <Box component="form" noValidate onSubmit={handleLoginSubmit} sx={{ mt: 1,display:'flex' ,flexDirection:"column",gap:"10px"}}>
              <TextField
                label="Email"
                name="email"
                value={loginFormData.email}
                onChange={handleLoginInputChange}
              />
              <TextField
                // ...
                label="Password"
                name="password"
                value={loginFormData.password}
                onChange={handleLoginInputChange}
              />
              {/* ... */}
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Registration Form */}
        <Grid
          bgcolor={"white"}
          padding={"1rem"}
          item
          xs={12}
          sm={8}
          md={5}
          ml={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 6,
              mx: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "1rem",
              bgcolor: "whitesmoke",
              borderRadius: "1.5rem",
              boxShadow:
                "{'0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)'}",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Typography component="h6" variant="h6" color={"gray"}>
            Creaet your account here
            </Typography>
            <br />
            <Box component="form" noValidate onSubmit={handleRegisterSubmit} sx={{ mt: 1,display:'flex' ,flexDirection:"column",gap:"10px"}}>
              <TextField
                // ...
                label="Email"
                name="email"
                value={registerFormData.email}
                onChange={handleRegisterInputChange}
              />
              <TextField
                // ...
                label="Name"
                name="name"
                value={registerFormData.name}
                onChange={handleRegisterInputChange}
              />
              <TextField
                // ...
                label="Password"
                name="password"
                value={registerFormData.password}
                onChange={handleRegisterInputChange}
              />
              {/* ... */}
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      </Box>
    </ThemeProvider>
  );
}
