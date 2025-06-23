import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import axiosInstance from "../axiosInstance";
import Navbar from "../components/Navbar";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs", error);
    }
    setLoading(false);
  };

  const applyJob = async (jobId) => {
    try {
      const res = await axiosInstance.post("/jobs/apply", { jobId,token }, { withCredentials: true });
      alert(res.data.message);
    } catch (error) {
      console.error("Error applying for job", error);
      alert("Failed to apply for job");
    //   navigate("/login")

    }
  };

  const deleteJob = async (jobId) => {
    try {
      await axiosInstance.delete(`/api/jobs/${jobId}`);
      setJobs(jobs.filter(job => job._id !== jobId));
      alert("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job", error);
      alert("Failed to delete job");
    }
  };

  return (
    <>
    <Navbar />
    <Container>
      <SearchBar>
        <input
          type="text"
          placeholder="Search jobs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </SearchBar>
      {loading ? (
        <Loader>
          <CircularProgress />
        </Loader>
      ) : (
        <JobGrid>
          {jobs
            .filter((job) =>
              job.jobTitle.toLowerCase().includes(query.toLowerCase())
            )
            .map((job) => (
              <JobCard key={job._id}>
                <ProfileImage src={job.profile || "/default-job.png"} alt="Company Logo" />
                <JobInfo>
                  <h3>{job.jobTitle}</h3>
                  <p>{job.company_name}</p>
                  <p>{job.jobDescription}</p>
                  <p><strong>Salary:</strong> {job.salary}</p>
                  <p><strong>Experience Needed:</strong> {job.experience}</p>
                  {/* <ButtonContainer> */}
                    <ApplyButton onClick={() => applyJob(job._id)}>Apply Now</ApplyButton>
                    {/* <DeleteButton onClick={() => deleteJob(job._id)}>Delete Job</DeleteButton> */}
                  {/* </ButtonContainer> */}
                </JobInfo>
              </JobCard>
            ))}
        </JobGrid>
      )}
    </Container>
    </>

  );
};

export default Jobs;

const Container = styled.div`
  width: 90%;
  margin: auto;
  padding: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  input {
    width: 50%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
`;

const JobGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const JobCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const JobInfo = styled.div`
  h3 {
    margin: 5px 0;
    font-size: 18px;
  }

  p {
    font-size: 14px;
    color: gray;
    margin: 5px 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ApplyButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #a71d2a;
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;
