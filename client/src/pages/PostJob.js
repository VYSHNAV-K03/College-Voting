// PostJob.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { apiUrl } from '../data/api';
import JobList from '../components/JobList';
import Cookies from 'universal-cookie';

const FormContainer = styled.form`
  max-width: 400px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const GoBackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const PostJob = () => {



  const cookies = new Cookies();

  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    experience: '',
    salary: '',
    token: localStorage.getItem("token"),
  });




  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiUrl+'/jobs', formData);
      console.log('Job posted successfully:', response.data);
      setTimeout(()=>{
        window.location.reload();
      },1000)
      // Add any additional logic after successful post
    } catch (error) {
      console.error('Error posting job:', error);
      // Handle error if needed
    }

  };

  const handleGoBack = () => {
    // Implement go back functionality here
    console.log('Go back clicked');

navigate("/")
  };

  return (<>
      <GoBackButton onClick={handleGoBack}>Go Back</GoBackButton>
    <FormContainer onSubmit={handleSubmit}>
    
      <FormGroup>
        <Label htmlFor="jobTitle">Job Title:</Label>
        <Input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          required
          />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="jobDescription">Job Description:</Label>
        <TextArea
          id="jobDescription"
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleChange}
          required
          />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="experience">Experience:</Label>
        <Input
          type="text"
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
          />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="salary">Salary:</Label>
        <Input
          type="text"
          id="salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          required
          />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </FormContainer>
    <JobList/>
          </>
  );
};

export default PostJob;
