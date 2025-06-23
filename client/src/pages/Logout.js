import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../data/api";
import Cookies from "universal-cookie";

const Logout = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  localStorage.removeItem("token");

  setTimeout(() => {
    navigate("/");
  }, 500);
  
  return <>Logout page</>;
};

export default Logout;
