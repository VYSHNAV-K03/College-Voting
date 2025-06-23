import React, { useEffect, useState } from "react";
import styled from "styled-components";
import image1 from "../assets/studentprofileimages/chikkubhai.png";
import DoneIcon from "@mui/icons-material/Done";
import LoopIcon from "@mui/icons-material/Loop";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import loader_logo from "../assets/loader/onetouch_logo.png";
import { apiUrl } from "../data/api";
import profile1 from "../assets/profile_dummy/profile1.png";
import axios from "axios";
import { Buffer } from "buffer";
import { Link, useNavigate } from "react-router-dom";
import search_by_name from "../assets/icons/search_filter_name.png";
import send_icon from "../assets/icons/send_icon.png";
import untrained from "../assets/icons/untrained.png";
import trained from "../assets/icons/trained.png";
import { useDispatch, useSelector } from "react-redux";
import { local_storage_off } from "../actions";
import { CircularProgress } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import Cookies from "universal-cookie";
import bulk_select_btn from "../assets/icons/bulk_select_btn.png";
import axiosInstance from "../axiosInstance";




const StudentList = (props) => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const getStudentList = async () => {
    try {
      setLoader(true);
  
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
  
      const res = await axiosInstance.post("/student/get_stud", {}, {
        headers: { Authorization: `Bearer ${token}` }, // Send token in headers
      });
  
      setData(res.data);
      setLoader(false);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching students", error);
      setLoader(false);
    }
  };



  useEffect(() => {
    getStudentList();
  }, []);

  return (
    <Container>
      <SearchBar>
        <input
          type="text"
          placeholder="Search influencers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </SearchBar>
      {loader ? (
        <Loader>
          <CircularProgress />
        </Loader>
      ) : (
        <CardGrid>
          {data
            .filter((student) =>
              student.name.toLowerCase().includes(query.toLowerCase())
            )
            .map((student) => (
              <StudentCard key={student.id} onClick={() => navigate(`/profile_admin_want`, { state: { id: student._id } })}>
                <ProfileImage src={student.profile || "/default-profile.png"} alt="Profile" />
                <StudentInfo>
                  <h3>{student.name}</h3>
                  <p>{student.institution_name || ""}</p>
                  <p>{student.branch || ""}</p>
                  <p>{student.year || ""}</p>
                  <p>{student.dev_status || "Self"}</p>

                </StudentInfo>
              </StudentCard>
            ))}
        </CardGrid>
      )}
    </Container>
  );
};

export default StudentList;

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

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const StudentCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const StudentInfo = styled.div`
  text-align: center;

  h3 {
    margin: 5px 0;
    font-size: 18px;
  }

  p {
    font-size: 14px;
    color: gray;
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;




