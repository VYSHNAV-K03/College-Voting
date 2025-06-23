import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { apiUrl } from "../data/api";
import profile1 from "../assets/profile_dummy/profile1.png";
import nav_icon from "../assets/icons/nav_icon.png";
import noti_nav from "../assets/icons/noti_nav.png";

import { Buffer } from "buffer";
import Cookies from "universal-cookie";
import { local_storage_clear } from "../actions";



const Navbar = (props) => {
  const [login, setlogin] = useState(true);
  const [profileimg, setprofileimg] = useState();

  const cookies = new Cookies();

  const [name, setname] = useState("No User");

  const [detail_more, setdetail_more] = useState(false);

  const [loader, setloader] = useState(true);

  const navigate = useNavigate();

  const [Role, setRole] = useState()


  console.log(localStorage.getItem("user"));
  

  const callNavbar = async () => {
    try {
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

      console.log(res.data.Role);

      setRole(res.data.Role);


      if (props.role) {
        if (data.Role === 0) {
          navigate("/profile");
        }
      }

      setname(data.name);

      setprofileimg(data.profile && data.profile);

      setlogin(false);
      if (res.status !== 200) {
        throw new Error(res.error);
      }
    } catch (e) {
      console.log("error", e);
      setlogin(true);
    }
  };

  console.log("profile: " + profileimg);

  const handleProfile = function () {
    if (Role === 0) {
      navigate("/profile");
    }
  };
  
  useEffect(() => {
    callNavbar();

    // document.body.addEventListener("click", (e) => {
    //   if (e.path[0].tagName !== "IMG") {
    //     setdetail_more(false);
    //   }
    // });
  }, []);

  return (
    <>
      <Container details_more={detail_more}>
        <div className="logo" onClick={() => navigate("/")}>
          VOXPOP
        </div>

        {Role !== 0 &&

          <Link className="profile_name nav-link" to="/election_student">
            Election
          </Link>
}
          {/* <Link className="profile_name nav-link" to="/jobs">
            Election
          </Link> */}

        {!login &&

        <div className="profile_container">

          {/* <div className="more_icon noti">
            <img
              src={noti_nav}
              alt=""
              onClick={() => navigate("/notification")}
            />
          </div> */}
          <div className="profile">
            <img
              src={
                profileimg
                  ? profileimg
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  
              }
              alt="profile"
            />
          </div>
          <div className="profile_name"
          onClick={handleProfile}
          >{name}</div>
        </div>
        }
          <div className="more_icon">
            <img
              src={nav_icon}
              alt=""
              onClick={() => setdetail_more(!detail_more)}
            />
          </div>

        {/* )} */}
        <div className="details_more" id="details_more">
          <div className="home" onClick={() => navigate("/")}>
            Home
          </div>
          
         
          <div className="login_status">
            {login ? (
              <NavLink
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                SignIn
              </NavLink>
            ) : (
              <NavLink
                to="/logout"
                style={{ textDecoration: "none", color: "white" }}
              >
                Sign Out
              </NavLink>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Navbar;



const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 25px 30px;

  position: relative;

  border-bottom: 1px solid rgba(0, 0, 0, 0.22);

  position: relative;

  .details_more {
    display: block;
    position: absolute;
    top: 64px;
    right: 30px;
    width: 150px;
    text-align: center;
    z-index: 200;
    transform: scaleY(${(props) => (props.details_more ? 1 : 0)});
    transition: all 0.4s ease;
    transform-origin: top;
  }
  .home,
  .about,
  .contact_us,
  .login_status {
    padding: 5px;
    color: #ffff;
    border-radius: 3px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;
    :hover {
      font-weight: 700;
    }
  }

  .home {
    /* background: rgba(74, 90, 150, 0.85); */
    background: #b7bdd5;
  }
  .about {
    background: #8d97bd;
  }
  .contact_us {
    background: #b7bdd5;
  }
  .login_status {
    background: #8d97bd;
  }
  .loader {
    position: absolute;
    background: white;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loader_sub {
    width: 300px;
    height: 100px;
    margin: auto;
    display: flex;
  }
  .logo {
    font-size: 26px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    /* identical to box height */
    color: #4a5a96;

    margin-right: auto;
    cursor: pointer;
  }
  .logo span {
    font-weight: 700;
  }
  .profile_container {
    display: flex;
    align-items: center;
  }
  .profile {
    display: flex;
    width: 34px;
    height: 34px;
    border-radius: 10px;
    margin-right: 10px;
  }
  .profile img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
  .profile_name {
    font-size: 20px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    line-height: 24px;

    color: #3d56b2;
    margin-right: 20px;
  }
  .more_icon {
    width: 23px;
    height: 23px;
    cursor: pointer;
    transition: all 0.4s ease;
    transform: rotate(${(props) => (props.details_more ? "-180deg" : "0deg")});
  }
  .noti {
    margin-right: 20px;
    transform: none;
  }
  .more_icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  /* .profile_container .more_icon:hover ~ .details_more {
    transform: scaleY(1);
  } */

  @media screen and (max-width: 439px) {
    padding: 15px 10px;
    .logo {
      font-size: 20px;
    }
    .profile {
      display: flex;
      width: 28px;
      height: 28px;
      border-radius: 10px;
      margin-right: 8px;
    }
    .profile_name {
      font-size: 15px;
      margin-right: 10px;
    }
    .more_icon {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
    .details_more {
      right: 10px;
    }
    .home,
    .about,
    .contact_us,
    .login_status {
      font-size: 15px;
    }
  }
`;