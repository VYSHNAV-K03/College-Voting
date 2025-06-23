import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { apiUrl } from "../data/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const ElectionStudent = () => {
  const [elections, setElections] = useState([]);


  const navigate = useNavigate();

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

  const getElectionStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return "Starting Soon";
    if (now >= start && now <= end) return "Vote Now";
    return "Election Over - See Results";
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Existing Elections</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {elections.map((election) => {
              const status = getElectionStatus(
                election.startDate,
                election.endDate
              );

              return (
                <TableRow key={election._id}>
                  <TableCell>{election.title}</TableCell>
                  <TableCell>
                    {new Date(election.startDate).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(election.endDate).toLocaleString()}
                  </TableCell>
                  <TableCell>{status}</TableCell>
                  <TableCell>
                    {status === "Vote Now" && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/candidates")}
                      >
                        Vote Now
                      </Button>
                    )}
                    {status === "Election Over - See Results" && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          alert(`Viewing results for ${election.title}`)
                        }
                      >
                        See Results
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default ElectionStudent;
