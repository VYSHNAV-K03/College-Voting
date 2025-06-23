import React from "react";
import styled from "styled-components";

const EducationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
  color: #555;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:first-child {
    background: #ccc;
    color: #333;
  }
  &:last-child {
    background: #007bff;
    color: white;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const EducationDetails = ({
  college_name,
  setcollege_name,
  branch,
  setbranch,
  year,
  setyear,
  setcomponent,
}) => {
  return (
    <EducationContainer>
      <Title>Enter Your Educational Details</Title>
      <FormGroup>
        <Label>College Name</Label>
        <Select value={college_name} onChange={(e) => setcollege_name(e.target.value)}>
          <option value="">Select Your College</option>
          <option value="College A">College A</option>
          <option value="College B">College B</option>
          <option value="College C">College C</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>Branch</Label>
        <Select value={branch} onChange={(e) => setbranch(e.target.value)}>
          <option value="">Select Your Branch</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>Academic Year</Label>
        <Select value={year} onChange={(e) => setyear(e.target.value)}>
          <option value="">Select Your Academic Year</option>
          <option value="2018-2021">2018-2021</option>
          <option value="2019-2022">2019-2022</option>
          <option value="2020-2023">2020-2023</option>
        </Select>
      </FormGroup>
      <ButtonGroup>
        <Button onClick={() => setcomponent(5)}>Back</Button>
        <Button onClick={() => setcomponent(4)}>Next</Button>
      </ButtonGroup>
    </EducationContainer>
  );
};

export default EducationDetails;
