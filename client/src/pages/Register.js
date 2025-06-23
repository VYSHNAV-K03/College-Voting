import * as React from "react";
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, Paper, CircularProgress } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { apiUrl } from "../data/api";
import styled from "styled-components";

const theme = createTheme();

export default function SignUp() {
  const [user, setUser] = React.useState({ name: "", email: "", phone: "", password: "" });
  const [profileImg, setProfileImg] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImg(file);
    setPreview(URL.createObjectURL(file));
  };

  const Postdata = async (e) => {
    e.preventDefault();
    const { name, email, password, phone } = user;
    if (!name || !email || !phone || !password) {
      alert("Please fill all fields properly.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    if (profileImg) formData.append("profile", profileImg);

    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/signup`, formData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } });
      const data = res.data;

      if (data.status === 422) {
        alert(data.error);
      } else {
        alert(data.message);
        const loginRes = await axios.post(`${apiUrl}/signin`, { email, password }, { withCredentials: true });
        localStorage.setItem("token", loginRes.data.token);
        navigate("/influencers");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <SignupContainer>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <StyledPaper elevation={6}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" className="signup-title">
                Register as Candidate
              </Typography>
              <Box component="form" onSubmit={Postdata} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField fullWidth name="name" label="Full Name" value={user.name} onChange={handleInput} required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth name="email" label="Email Address" value={user.email} onChange={handleInput} required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth name="phone" label="Phone Number" value={user.phone} onChange={handleInput} required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth name="password" label="Password" type="password" value={user.password} onChange={handleInput} required />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained" component="label" fullWidth>
                      Upload College ID
                      <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                    </Button>
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    {preview ? (
                      <Avatar src={preview} sx={{ width: 80, height: 80, mb: 2 }} />
                    ) : (
                      <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: "grey.300" }}>
                        <PhotoCameraIcon />
                      </Avatar>
                    )}
                    <Button variant="contained" component="label" fullWidth>
                      Upload Profile Image
                      <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                    </Button>
                  </Grid>
                </Grid>
                {loading ? (
                  <CircularProgress sx={{ display: "flex", margin: "auto", mt: 2 }} />
                ) : (
                  <StyledButton type="submit" fullWidth variant="contained">
                    Sign Up
                  </StyledButton>
                )}
              </Box>
              <Grid container justifyContent="center">
                <Grid item>
                  <StyledLink to="/login">Already have an account? Sign in</StyledLink>
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item>
                  <StyledregisterLink to="/reg_stud"> Are You A Student? Register as Student</StyledregisterLink>
                </Grid>
              </Grid>
            </Box>
          </StyledPaper>
        </Container>
      </SignupContainer>
    </ThemeProvider>
  );
}

// Styled Components for CSS
const SignupContainer = styled.div`
  background: linear-gradient(135deg, #3498db, #8e44ad);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPaper = styled(Paper)`
  padding: 30px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  color: white;
`;

const StyledButton = styled(Button)`
  background-color: #1abc9c !important;
  font-weight: bold;
  margin-top: 15px !important;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: #16a085 !important;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color:rgb(21, 171, 209);
  font-weight: bold;
  transition: 0.3s;
  &:hover {
    color: #bdc3c7;
  }
`;

const StyledregisterLink = styled(Link)`
  text-decoration: none;
  color:rgb(21, 171, 209);
  font-weight: bold;
  transition: 0.3s;
  &:hover {
    color: #bdc3c7;
  }
`;
