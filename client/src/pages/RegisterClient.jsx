import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { apiUrl } from "../data/api";
import axios from "axios";
import { CircularProgress, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const theme = createTheme();

export default function RegisterClient() {
  const [accountType, setAccountType] = React.useState("client");
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });
  const [profileImg, setProfileImg] = React.useState(null);
  const [loader, setLoader] = React.useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfileImg(e.target.files[0]);
  };

  const handleAccountType = (event, newType) => {
    if (newType) {
      setAccountType(newType);
      setUser({ name: "", email: "", phone: "", password: "", cpassword: "" });
    }
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, cpassword } = user;
    if (!name || !email || !phone || !password || !cpassword) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("cpassword", cpassword);
    if (profileImg) {
      formData.append("profile", profileImg);
    }

    setLoader(true);

    try {
      const res = await axios.post(apiUrl + `/signup_client`, formData, {
        withCredentials: true,
      });
      const data = res.data;
      if (data.status === 422) {
        alert(data.error);
      } else {
        alert("Registration successful");
         // Automatically log in the user after registration
         const loginRes = await axios.post(
          `${apiUrl}/signin`,
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        );

        localStorage.setItem("token", loginRes.data.token);
        navigate("/influencers");
      }
    } catch (error) {
      console.error("Registration error", error);
    }
    setLoader(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register as {accountType === "client" ? "Client" : "Brand"}
          </Typography>
          <ToggleButtonGroup
            value={accountType}
            exclusive
            onChange={handleAccountType}
            sx={{ mt: 2, mb: 3 }}
          >
            <ToggleButton value="client">Client</ToggleButton>
            <ToggleButton value="brand">Brand</ToggleButton>
          </ToggleButtonGroup>
          <Box component="form" noValidate onSubmit={postData} sx={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth id="name" label={accountType === "client" ? "Client Name" : "Brand Name"} name="name" value={user.name} onChange={handleInput} autoFocus />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth id="email" label={accountType === "client" ? "Client Email" : "Brand Email"} name="email" value={user.email} onChange={handleInput} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth id="phone" label="Phone Number" name="phone" value={user.phone} onChange={handleInput} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth name="password" label="Password" type="password" value={user.password} onChange={handleInput} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth name="cpassword" label="Confirm Password" type="password" value={user.cpassword} onChange={handleInput} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Upload {accountType === "client" ? "Profile" : "Brand Logo"}</Typography>
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </Grid>
            </Grid>
            {loader ? (
              <CircularProgress style={{ display: "flex", margin: "auto", mt: 3 }} />
            ) : (
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
            )}
          </Box>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/register_client" variant="body2">
                Regsiter as Influencer
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}