// ApplicationsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { apiUrl } from '../data/api';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
`;

const ApplicationCard = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 80%;
`;

const ApplicantName = styled.h2`
  margin-bottom: 10px;
`;

const ProfileButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
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

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const cookies = new Cookies();

  const token= localStorage.getItem("token")

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.post(apiUrl+'/jobs/applications/company',{
        token:token
      });
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching job applications:', error);
    }
  };

  console.log(applications);

  const navigate= useNavigate()


  const handleGoBack = () => {
    // Implement go back functionality here
    console.log('Go back clicked');

    navigate("/")
  };
  return (
    <>
      <GoBackButton onClick={handleGoBack}>Go Back</GoBackButton>
    <Container>

      {applications.map(application => (
          <ApplicationCard key={application._id}>
          <ApplicantName>{application.applicantName}</ApplicantName>
          <ProfileButton onClick={() =>  navigate("/profile_admin_want", 
                                            {state: { id: application.applicant_id
                                            },
                                        })} >View Profile</ProfileButton>
        </ApplicationCard>
      ))}
    </Container>
      </>
  );
};

export default ApplicationsPage;
