// JobList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { apiUrl } from '../data/api';

const JobListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const JobCard = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const JobTitle = styled.h2`
  margin-bottom: 10px;
`;

const JobDescription = styled.p``;

const Experience = styled.p`
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  margin-top: 10px;
  background-color: #ff5c5c;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`;

const Salary = styled.p``;

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(apiUrl+'/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      await axios.delete(apiUrl+`/jobs/${id}`);
      fetchJobs(); // Refresh job list after deletion
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <JobListContainer>
      {jobs.map(job => (
        <JobCard key={job._id}>
          <JobTitle>{job.jobTitle}</JobTitle>
          <JobDescription>{job.jobDescription}</JobDescription>
          <Experience>Experience: {job.experience}</Experience>
          <Salary>Salary: {job.salary}</Salary>
          <DeleteButton onClick={() => handleDeleteJob(job._id)}>Delete</DeleteButton>

        </JobCard>
      ))}
    </JobListContainer>
  );
};

export default JobList;
