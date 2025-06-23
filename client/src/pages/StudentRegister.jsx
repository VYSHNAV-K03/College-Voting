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
import { Card, CardContent, CircularProgress, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import { apiUrl } from "../data/api";

const theme = createTheme();

export default function UserSignUp() {
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    branch: "",
    year: "",
  });
  const [profileImg, setProfileImg] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const branches = ["Computer Science", "Mechanical Engineering", "Electrical Engineering"];
  const years = ["2018-2021", "2019-2022", "2020-2023"];

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
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(user).forEach((key) => formData.append(key, user[key]));
      if (profileImg) formData.append("profile", profileImg);
      
      const res = await axios.post(`${apiUrl}/signup_user`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.status === 422) {
        alert(res.data.error);
      } else {
        alert(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Card elevation={6} sx={{ mt: 8, borderRadius: 4 }}>
          <CardContent>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Student Registration
              </Typography>
              <Box component="form" onSubmit={Postdata} sx={{ mt: 3, width: "100%" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField fullWidth name="name" label="Name" value={user.name} onChange={handleInput} autoFocus />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="email" label="Email" value={user.email} onChange={handleInput} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="password" label="Password" type="password" value={user.password} onChange={handleInput} />
                  </Grid>
                  <Grid item xs={12} >
                    <TextField fullWidth name="phone" label="Phone" value={user.phone} onChange={handleInput} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Branch</InputLabel>
                      <Select name="branch" value={user.branch} onChange={handleInput}>
                        {branches.map((branch) => (
                          <MenuItem key={branch} value={branch}>{branch}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Year</InputLabel>
                      <Select name="year" value={user.year} onChange={handleInput}>
                        {years.map((year) => (
                          <MenuItem key={year} value={year}>{year}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    {preview ? (
                      <Avatar src={preview} sx={{ width: 100, height: 100, mb: 2 }} />
                    ) : (
                      <Avatar sx={{ width: 100, height: 100, mb: 2, bgcolor: "grey.300" }}>
                        <PhotoCameraIcon />
                      </Avatar>
                    )}
                    <Button variant="contained" component="label">
                      Upload Profile Image
                      <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                    </Button>
                  </Grid>
                </Grid>
                {loading ? (
                  <CircularProgress sx={{ display: "flex", margin: "auto", mt: 2 }} />
                ) : (
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Sign Up
                  </Button>
                )}
              </Box>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link to="/login">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link to="/register">Register as Candidate</Link>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
