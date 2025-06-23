import React, { useState, useEffect } from "react";
import styled from "styled-components";
import profile from "../assets/profile_dummy/profile1.png";
import bg1 from "../assets/profilepage/bg1.svg";
import loader_logo from "../assets/loader/onetouch_logo.png";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
import { apiUrl } from "../data/api";
import Navbar from "../components/Navbar";
import { PDFDownloadLink } from "@react-pdf/renderer";
import GeneratePdf from "./generatePdf";
import Cookies from "universal-cookie";

const Profilepage = () => {
  const [block, setblock] = useState(1);

  const [data, setdata] = useState();

  const [yes_no, setyes_no] = useState();

  const [loader, setloader] = useState(false);

  const navigate = useNavigate();

  const cookies = new Cookies();
  const token = localStorage.getItem("token");

  const callNavbar = async () => {
    try {
      setloader(true);

      const res = await axios.post(
        apiUrl + `/getData`,
        {
          token: localStorage.getItem("token"),
        },
        {
          withCredentials: true,
        }
      );

      const data = res.data;

      console.log(res.data);
      

      setdata(res.data);

      if (!res.data.year) {
        navigate("/infoform");
      }

      if (res.status !== 200) {
        throw new Error(res.error);
      }
      setloader(false);
    } catch (e) {
      console.log("error", e);
      // navigate("/login");
      setloader(false);
    }
  };


  const [jobs, setJobs] = useState([]);

  console.log(jobs);

  console.log(data);
  
 
  
  const fetchJobs = async () => {
    try {
      const response = await axios.get(apiUrl+'/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };


  const handleApplyJob = async (jobId) => {
    try {
      const response = await axios.post(apiUrl+'/jobs/apply', {
        jobId,
        token: token
      });
      console.log('Job application submitted:', response.data);
      window.alert('Job application submitted:', response.data);

      // Optionally, you can update state or perform other actions after successful submission
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };
  

  useEffect(() => {
    fetchJobs();
    callNavbar();
  }, []);

  return (
    <div className="main">
      <Navbar />
      <Container bg={bg1} block={block} loader={loader}>
        {loader ? (
          <div className="loader">
            <div className="loader_image">
              <img src={loader_logo} alt="" />
            </div>
            <div className="loader_line_container">
              <div className="line_loader"></div>
            </div>
          </div>
        ) : (
          <div className="profile_container_main">
            <div
              className="update_details"
              onClick={() => navigate("/infoform")}
            >
              Update Profile
            </div>
            <div className="left">
              <div className="image">
                <img
                  src={
                   data?.profile
                  }
                  alt="profile"
                />
              </div>
              <div className="name">{data && data.name}</div>
              

              <div className="profile_buttons">
                <div className="profile_btn" onClick={() => setblock(1)}>
                  Profile
                </div>
                {/* <div className="skills_btn" onClick={() => setblock(2)}>
                  Skills
                </div> */}
                {/* <div className="edu_btn" onClick={() => setblock(6)}>
                  Education
                </div> */}
                <div className="interview_btn" onClick={() => setblock(2)}>
                  Votes
                </div>
               
              </div>
            </div>
            <div className="right">
              {block === 1 && (
                <div className="profile_container">
                  <div className="email_container style_profile_elements_bold">
                    <div className="width_profile_elements">Email</div>
                    <div className="user_name style_profile_elements_light">
                      {data && data.email}
                    </div>
                  </div>

                  <div className="email_container style_profile_elements_bold">
                    <div className="width_profile_elements">Contact Number</div>
                    <div className="user_name style_profile_elements_light">
                      {data && data.phone}
                    </div>
                  </div>
                
                  {/* <div className="id_detail style_profile_elements_bold">
                    <div className="width_profile_elements">ID proof</div>
                    <div
                      className="view"
                      onClick={() => window.alert("id card is not uploaded")}
                    >
                      View
                    </div>
                  </div> */}

<div className="email_container style_profile_elements_bold">
                    <div className="width_profile_elements">Current Party</div>
                    <div className="user_name style_profile_elements_light">
                    {data && data.dev_status? data.dev_status: "Self"}
                    </div>
                  </div>

                  <div className="email_container style_profile_elements_bold">
                    <div className="width_profile_elements">College</div>
                    <div className="user_name style_profile_elements_light">
                    {data && data.institution_name? data.institution_name: "Unknown"}
                    </div>
                  </div>

                  <div className="email_container style_profile_elements_bold">
                    <div className="width_profile_elements">Branch</div>
                    <div className="user_name style_profile_elements_light">
                    {data && data.branch? data.branch: "Unknown"}
                    </div>
                  </div>


                  <div className="email_container style_profile_elements_bold">
                    <div className="width_profile_elements">Year</div>
                    <div className="user_name style_profile_elements_light">
                    {data && data.year? data.year: "Unknown"}
                    </div>
                  </div>
                </div>
              )}
              {block === 2 && (
                <div className="skills_container">
                  <div className="known_languages"></div>
                  
                  

                 
                </div>
              )}
              {block === 3 && (
                <div className="certificates_container">
                  <div className="college_id_certificate">
                    <div className="name_id">Youtube</div>
                    <div className="view">View</div>
                  </div>
                  <div className="sslc_certificate">
                    <div className="name_sslc">Instagram</div>
                    <div className="view">View</div>
                  </div>
                  <div className="plustwo_certificate">
                    <div className="name_plustwo">Linkedin</div>
                    <div className="view">View</div>
                  </div>
                  <div className="udemy_certificate">
                    <div className="name_udemy">Other</div>
                    <div className="view">View</div>
                  </div>
                </div>
              )}
              {block === 4 && (
                <div className="interview_container">
                  <div className="companies_select_title">
                    Companies Selected For Interview:
                  </div>
                  <div className="companies_select">
                    <ul>
                      {data &&
                        data.placement[0] &&
                        data.placement
                          .map(
                            (item, i) => item.company_name
                            // <div className="item">
                            //   <div className="cname">{item.company_name}</div>
                            //   <div className="clevel">{item.level_of_placement}</div>
                            // </div>
                          )

                          .filter(
                            (value, index, array_ref) =>
                              array_ref.indexOf(value) === index
                          )
                          .map((x, b) => <li key={b}>{x}</li>)}
                    </ul>
                  </div>
                </div>
              )}
              {block === 6 && (
                <div className="educ_main_container">
                  {data && (
                    <div className="education_details_container">
                      <div className="btech_details">
                        <div className="title_btech">Academic Details:</div>
                        <div className="element_detail">
                          <div className="title_element">College</div>
                          <div className="content_btech">
                            {" "}
                            {data?.institution_name
                            }
                          </div>
                        </div>
                        <div className="element_detail">
                          <div className="title_element">Branch</div>
                          <div className="content_btech">
                            {" "}
                            {data?.branch}
                          </div>
                        </div>
                        <div className="element_detail">
                          <div className="title_element">Year</div>
                          <div className="content_btech">
                            {" "}
                            {data?.year}
                          </div>
                        </div>
                        </div>
                        </div>

                  )}  
                </div>
              )}
              {block === 7 && (
                <div className="interview_container">
                  <div className="companies_select_title">
                    Jobs available
                  </div>
                  <div className="companies_select">
                    
                  <JobListContainer>
                    {jobs.map(job => (
                      <JobCard key={job._id}>
                        <JobLogo src={job.profile} alt={`${job.profile} logo`} />
                        <JobName>{job.jobTitle}</JobName>
                        <CompanyName>{job.company_name}</CompanyName>
                        <JobDescription>{job.jobDescription}</JobDescription>
                        <Salary>Salary: {job.salary}</Salary>
                        <Experience>Experience Needed: {job.experience}</Experience>
                        <ApplyButton onClick={() => handleApplyJob(job._id)}>Apply Job</ApplyButton>
                      </JobCard>
                    ))}
                  </JobListContainer>

                    
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Profilepage;




const Container = styled.div`
  position: relative;
  .update_details {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #4a5a96;
    border: 1px solid #4a5a96;
    border-radius: 10px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height */
    display: flex;
    align-items: center;
    justify-content: center;

    width: 150px;
    height: 38px;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    :hover {
      transform: scale(1.05);
      background: #4a5a96;
      color: white;
    }
  }
  .update_details_2 {
    position: absolute;
    right: 170px;
    top: 10px;
    color: #4a5a96;
    border: 1px solid #4a5a96;
    border-radius: 10px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height */
    display: flex;
    align-items: center;
    justify-content: center;

    width: 150px;
    height: 38px;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    :hover {
      transform: scale(1.05);
      background: #4a5a96;
      color: white;
    }
  }
  @media screen and (max-width: 710px) {
    .update_details_2 {
      right: 0;
      left: 10px;
    }
  }
  @media screen and (max-width: 450px) {
    .update_details {
      font-size: 15px;
      width: 120px;
      height: 28px;
    }
    .update_details_2 {
      font-size: 15px;
      width: 120px;
      height: 28px;
    }
  }
  .loader {
    position: absolute;
    left: 0;
    right: 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    margin: auto;
  }
  .loader_image {
    width: 200px;
    height: 200px;
  }
  .loader_image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .loader_line_container {
    width: 300px;
    height: 10px;

    background: rgba(0, 0, 0, 0.34);
    border-radius: 5px;
    position: relative;
  }
  .line_loader {
    position: absolute;
    background: #4a5a96;
    border-radius: 5px;

    top: 0;
    bottom: 0;
    left: 0;
    width: ${(props) => (props.loader ? "250px" : "300px")};
    animation: loader 5s ease;
  }

  @keyframes loader {
    from {
      width: 0px;
    }
    to {
      width: ${(props) => (props.loader ? "250px" : "300px")};
    }
  }
  @media screen and (max-width: 700px) {
    .loader_image {
      width: 130px;
      height: 130px;
    }
    .loader_line_container {
      width: 150px;
      height: 8px;
    }
    .line_loader {
      width: ${(props) => (props.loader ? "120px" : "150px")};
    }

    @keyframes loader {
      from {
        width: 0px;
      }
      to {
        width: ${(props) => (props.loader ? "120px" : "150px")};
      }
    }
  }

  .button_container {
    display: flex;
  }
  .update {
    display: flex;
    margin: 20px 30px 10px auto;
  }
  .signout {
    display: flex;
    margin: 20px auto 10px 30px;
  }
  .profile_container_main {
    height: calc(100vh - 95px);
    background-color: #fff;
    display: flex;
  }
  .left {
    height: 100%;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid rgba(0, 0, 0, 0.22);
  }

  .image {
    width: 159px;
    height: 159px;
    margin: 20px 0 15px 0;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
  .name {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 39px;
    /* identical to box height */

    color: #4a5a96;
    margin-bottom: 5px;
  }
  .detail1 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-align: center;

    color: #000000;

    margin-bottom: 40px;
  }

  .profile_btn,
  .skills_btn,
  .certificate_btn,
  .interview_btn,
  .jobs_btn,
  .Select_stud_btn,
  .edu_btn {
    border: 1px solid #4a5a96;
    border-radius: 10px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height */
    display: flex;
    align-items: center;
    justify-content: center;

    width: 130px;
    height: 38px;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    :hover {
      transform: scale(1.05);
    }
  }

  .profile_btn {
    margin: 20px 0;
    color: ${(props) => (props.block === 1 ? "white" : "#4a5a96")};
    background: ${(props) => (props.block === 1 ? "#4a5a96" : "white")};
  }
  .skills_btn {
    margin-bottom: 20px;
    color: ${(props) => (props.block === 2 ? "white" : "#4a5a96")};
    background: ${(props) => (props.block === 2 ? "#4a5a96" : "white")};
  }
  .edu_btn {
    margin-bottom: 20px;
    color: ${(props) => (props.block === 6 ? "white" : "#4a5a96")};
    background: ${(props) => (props.block === 6 ? "#4a5a96" : "white")};
  }
  .interview_btn {
    margin-bottom: 20px;
    color: ${(props) => (props.block === 2 ? "white" : "#4a5a96")};
    background: ${(props) => (props.block === 2 ? "#4a5a96" : "white")};
  }
  .certificate_btn {
    margin-bottom: 20px;
    color: ${(props) => (props.block === 3 ? "white" : "#4a5a96")};
    background: ${(props) => (props.block === 3 ? "#4a5a96" : "white")};
  }
  .jobs_btn {
    margin-bottom: 20px;
    color: ${(props) => (props.block === 7 ? "white" : "#4a5a96")};
    background: ${(props) => (props.block === 7 ? "#4a5a96" : "white")};
  }
  .Select_stud_btn {
    color: ${(props) => (props.block === 5 ? "white" : "#4a5a96")};
    background: ${(props) => (props.block === 5 ? "#4a5a96" : "white")};
  }

  .right {
    display: flex;
    width: 100%;
  }

  .profile_container {
    display: flex;
    flex-direction: column;
    padding: 160px 0 0 60px;
  }

  .style_profile_elements_bold {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;

    color: #000000;
    display: flex;

    margin-bottom: 50px;
  }
  .width_profile_elements {
    width: 300px;
  }

  .style_profile_elements_light {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;

    color: #000000;

    margin-right: 20px;
  }
  .view {
    width: 120px;
    height: 35px;

    background: #4a5a96;
    border: 1px solid #4a5a96;
    border-radius: 10px;

    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height */

    text-align: center;

    color: #ffffff;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
  }

  @media screen and (max-width: 1057px) {
    .left {
      min-width: 200px;
    }
    .image {
      width: 129px;
      height: 129px;
      margin: 20px 0 15px 0;
    }
    .name {
      font-size: 28px;
    }
    .detail1 {
      font-size: 16px;
      margin-bottom: 20px;
    }
    .profile_btn,
    .skills_btn,
    .certificate_btn,
    .interview_btn,
    .jobs_btn,
    .Select_stud_btn,
    .edu_btn {
      width: 110px;
      height: 35px;
      font-size: 14px;
    }
    .profile_container {
      padding: 70px 0 0 30px;
    }
    .width_profile_elements {
      width: 200px;
    }
    .style_profile_elements_bold {
      font-size: 20px;
      margin-bottom: 30px;
    }
    .style_profile_elements_light {
      font-size: 20px;
    }
  }
  @media screen and (max-width: 709px) {
    .profile_container_main {
      flex-direction: column;
    }
    .left {
      border-bottom: 1px solid rgba(0, 0, 0, 0.22);
      border-right: 0;
      width: 100%;
      height: auto;
    }
    .image {
      margin: 20px 0 5px 0;
    }
    .detail1 {
      font-size: 16px;
      margin-bottom: 10px;
    }
    .profile_container {
      padding: 10px 0 0 10px;
    }
    .profile_buttons {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
    .profile_btn,
    .skills_btn,
    .certificate_btn,
    .interview_btn,
    .jobs_btn,
    .Select_stud_btn,
    .edu_btn {
      margin: 5px;
    }
    .width_profile_elements {
      max-width: 130px;
    }
    .style_profile_elements_bold {
      font-size: 20px;
      margin-bottom: 30px;
      flex-wrap: wrap;
    }

    .style_profile_elements_light {
      font-size: 20px;
    }
  }
  .skills_container {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
  }
  .first_skill,
  .third_skill,
  .known_languages {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 38px;
    line-height: 46px;
    margin-bottom: 10px;

    color: #484848;
  }
  .second_skill {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 38px;
    line-height: 46px;

    color: #000854;
  }
  li {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 46px;
    margin-bottom: 8px;

    color: #484848;
  }
  .current_status_skill {
    margin-top: 30px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 38px;
    line-height: 46px;

    color: #000854;
  }

  .certificates_container {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
  }

  .college_id_certificate,
  .sslc_certificate,
  .plustwo_certificate,
  .udemy_certificate {
    display: flex;
  }
  .name_id,
  .name_sslc,
  .name_plustwo,
  .name_udemy {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 36px;
    display: flex;
    align-items: center;

    color: #545454;
    width: 500px;
    margin-bottom: 40px;
  }
  @media screen and (max-width: 1057px) {
    .name_id,
    .name_sslc,
    .name_plustwo,
    .name_udemy {
      width: 300px;
    }
  }
  @media screen and (max-width: 709px) {
    .name_id,
    .name_sslc,
    .name_plustwo,
    .name_udemy {
      width: 150px;
      font-size: 20px;
    }
  }

  .interview_container {
    padding: 50px;
  }
  .companies_select_title {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 38px;
    line-height: 46px;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 709px) {
    .interview_container {
      padding: 20px;
    }
    .companies_select_title {
      font-size: 30px;
    }
  }

  .placement_select_container {
    padding: 100px;
    width: 100%;
  }

  .text_doyou {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 39px;
    /* identical to box height */

    color: #4a5a96;
    margin-bottom: 20px;
  }

  .yes_no_doyou {
    margin-bottom: 30px;
    input {
      width: 23px;
      height: 23px;
      margin-right: 5px;
    }
    label {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 400;
      font-size: 32px;
      line-height: 39px;
      /* identical to box height */
      margin-right: 20px;

      cursor: pointer;
      color: #000000;
    }
  }
  .confirm_doyou {
    width: 161px;
    height: 49px;
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;

    color: #ffffff;

    background: #4a5a96;
    border-radius: 10px;

    cursor: pointer;
  }

  @media screen and (max-width: 500px) {
    .text_doyou {
      font-size: 22px;
      margin-bottom: 0px;
    }
    .yes_no_doyou {
      align-items: center;
      margin-bottom: 10px;
      input {
        width: 15px;
        height: 15px;
      }
      label {
        font-size: 22px;
      }
    }
    .confirm_doyou {
      width: 101px;
      height: 35px;
      font-size: 18px;
    }
  }
  .level_exam_more_detail {
    position: relative;
    padding: 0 0 100px 0;
    max-width: 900px;
  }

  .notify {
    width: 180px;
    height: 53px;
    position: absolute;
    bottom: 0;
    right: 0;

    background: #4a5a96;
    border-radius: 5px;

    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;

    color: #ffffff;

    border: none;
    outline: none;
  }
  .exam_level_lemd {
    display: flex;
    margin-bottom: 30px;
  }
  .title_exam_level_lemd {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;

    color: #000000;

    width: 250px;
    height: 29px;
  }

  .exam_level_lemd select {
    border: 1px solid #000000;
    border-radius: 10px;

    width: 56px;
    height: 34px;

    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;

    color: #000000;

    background-color: white;
    cursor: pointer;
  }
  .exam_date_lemd {
    display: flex;
    margin-bottom: 30px;
  }
  .title_examdate_lemd {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;

    color: #000000;

    width: 250px;
    height: 29px;
  }
  .requirements_lemd {
    display: flex;
    margin-bottom: 10px;
  }
  .title_require_lemd {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;

    color: #000000;

    width: 250px;
    height: 29px;
  }
  .requirement_each_lemd input {
    border: 1px solid #000000;

    width: 12px;
    height: 12px;
  }
  .requirement_each_lemd label {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;

    color: #000000;

    width: 86px;
    height: 29px;
    margin-right: 20px;
  }

  .description_requirement_lemd textarea {
    width: 306px;
    height: 111px;

    border: 1px solid #000000;
    border-radius: 5px;

    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;

    color: rgba(0, 0, 0, 0.6);

    margin-bottom: 30px;
    margin-left: 250px;
  }
  .exam_type_lemd {
    display: flex;
    margin-bottom: 30px;
  }
  .title_examtype {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;

    color: #000000;

    width: 250px;
    height: 29px;
  }
  .examtype_each_lemd input {
    border: 1px solid #000000;

    width: 12px;
    height: 12px;
  }
  .examtype_each_lemd label {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;

    color: #000000;

    width: 86px;
    height: 29px;
    margin-right: 20px;
  }
  .exam_mode_lemd {
    display: flex;
  }
  .title_exammode {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;

    color: #000000;

    width: 250px;
    height: 29px;
  }
  .exammode_each_lemd input {
    border: 1px solid #000000;

    width: 12px;
    height: 12px;
  }
  .exammode_each_lemd label {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;

    color: #000000;

    width: 86px;
    height: 29px;
    margin-right: 20px;
  }

  @media screen and (max-width: 1057px) {
    .placement_select_container {
      padding: 30px;
    }
    .title_exam_level_lemd,
    .title_exammode,
    .title_examtype,
    .title_require_lemd,
    .title_examdate_lemd {
      width: 180px;
      height: 29px;
    }
    .description_requirement_lemd textarea {
      width: 206px;
      height: 71px;
      margin-left: 180px;
    }
    .notify {
      width: 120px;
      height: 43px;
      font-size: 20px;
    }
  }
  @media screen and (max-width: 515px) {
    .placement_select_container {
      padding: 10px;
    }
    .title_exam_level_lemd,
    .title_exammode,
    .title_examtype,
    .title_require_lemd,
    .title_examdate_lemd {
      width: 180px;
      height: 29px;

      font-size: 20px;
    }
    .exam_level_lemd select {
      font-size: 15px;
      width: 50px;
    }
    .exam_date_lemd {
      flex-direction: column;
    }
    .requirements_lemd {
      flex-direction: column;
    }
    .requirements_lemd {
      label {
        font-size: 20px;
      }
    }
    .requirement_each_lemd {
      margin-left: 30px;
    }
    .description_requirement_lemd textarea {
      margin-left: 30px;
    }
    .exam_type_lemd {
      flex-direction: column;
      .examtype_each_lemd {
        margin-left: 30px;
      }
      label {
        font-size: 20px;
      }
    }
    .exam_mode_lemd {
      flex-direction: column;
      .exammode_each_lemd {
        margin-left: 30px;
      }
      label {
        font-size: 20px;
      }
    }

    .notify {
      width: 80px;
      height: 33px;
      bottom: 50px;
      right: 50px;

      background: #4a5a96;
      border-radius: 5px;

      font-size: 20px;
      line-height: 29px;
    }
  }

  .education_details_container {
    padding: 0 30px;
  }
  .btech_details {
    margin-bottom: 50px;
  }
  .title_btech {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;

    color: #4a5a96;

    margin-bottom: 15px;
  }
  .element_detail {
    display: flex;
    margin-bottom: 15px;
  }
  .pending_response {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;

    color: #000000;
  }
  .title_element {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;

    color: #000000;

    width: 300px;
  }
  .content_btech {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;

    color: #000000;
  }
  .sslc,
  .plustwo {
    position: relative;
  }
  .sslc .view {
    position: absolute;
    top: 88px;
    left: 400px;
  }
  .plustwo .view {
    position: absolute;
    top: 105px;
    left: 400px;
  }
  @media screen and (max-width: 769px) {
    .education_details_container {
      padding: 10px;
    }
  }
  @media screen and (max-width: 533px) {
    .title_btech {
      font-size: 24px;
    }
    .title_element {
      font-size: 20px;
      width: 230px;
    }
    .content_btech {
      font-size: 20px;
    }
    .sslc .view {
      top: 0px;
      left: 230px;
    }
    .plustwo .view {
      top: 0px;
      left: 230px;
    }
  }
  @media screen and (max-width: 533px) {
    .education_details_container {
      padding: 5px;
    }
    .title_btech {
      font-size: 22px;
    }
    .sslc .view {
      top: 0px;
      left: 220px;
      width: 80px;
    }
    .plustwo .view {
      top: 0px;
      left: 220px;
      width: 80px;
    }
  }
`;


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
  width: 100%;
`;

const JobName = styled.h2`
  margin-bottom: 10px;
`;

const JobLogo = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-bottom: 10px;
`;

const CompanyName = styled.p`
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 22px;
`;

const JobDescription = styled.p``;

const Salary = styled.p``;

const Experience = styled.p`
  margin-top: 10px;
`;

const ApplyButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`;

