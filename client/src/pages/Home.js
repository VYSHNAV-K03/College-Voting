import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import SearchArea from "../components/SearchArea";
import SearchAreaCollege from "../components/SearchAreaCollege";
import StudentList from "../components/StudentList";

const Container = styled.div`
  background: #f5f5f5;
  min-height: 100vh;
`;

const Home = () => {
  const location = useLocation();
  const [id, setid] = useState([]);



  const [role, setrole] = useState(1);

  // console.log(location.state && location.state.id);
  return (
    <Container>
      <Navbar role={true} />
      <StudentList id={location.state && location.state.id} />
    </Container>
  );
};

export default Home;
