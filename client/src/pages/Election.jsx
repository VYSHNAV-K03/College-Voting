import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";
import { apiUrl } from "../data/api";
import Navbar from "../components/Navbar";

const Election = () => {
  const [elections, setElections] = useState([]);
  const [newElection, setNewElection] = useState({
    title: "",
    startDate: "",
    endDate: "",
    token: localStorage.getItem("token")
  });

  useEffect(() => {
    fetchElections();
    const interval = setInterval(fetchElections, 60000); // Auto-fetch every minute
    return () => clearInterval(interval);
  }, []);

  const fetchElections = async () => {
    try {
      const res = await axios.get(`${apiUrl}/election/all`);
      console.log(res.data);
      
      setElections(res.data);
    } catch (error) {
      console.error("Error fetching elections", error);
    }
  };

  const handleInputChange = (e) => {
    setNewElection({ ...newElection, [e.target.name]: e.target.value });
  };

  const createElection = async () => {
    try {
      await axios.post(`${apiUrl}/election/create`, newElection);
      alert("Election created!");
      fetchElections();
    } catch (error) {
      console.error("Error creating election", error);
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Election Management</Typography>

        {/* Create Election */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6">Create Election</Typography>
          <TextField label="Title" name="title" fullWidth margin="normal" onChange={handleInputChange} />
          <TextField label="Start Date & Time" name="startDate" type="datetime-local" fullWidth margin="normal" InputLabelProps={{ shrink: true }} onChange={handleInputChange} />
          <TextField label="End Date & Time" name="endDate" type="datetime-local" fullWidth margin="normal" InputLabelProps={{ shrink: true }} onChange={handleInputChange} />
          <Button variant="contained" sx={{ mt: 2 }} onClick={createElection}>Create</Button>
        </Paper>

        {/* Display Elections */}
        <Typography variant="h6">Existing Elections</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {elections.map((election) => (
              <TableRow key={election._id}>
                <TableCell>{election.title}</TableCell>
                <TableCell>{new Date(election.startDate).toLocaleString()}</TableCell>
                <TableCell>{new Date(election.endDate).toLocaleString()}</TableCell>
                <TableCell>{election.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default Election;
