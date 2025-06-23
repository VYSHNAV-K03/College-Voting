import React, { useEffect } from "react";
import axios from "axios";
import backgroundImage from "../assets/123.jpg"; // Path to background image
import graphImage from "../assets/hh.jpg"; // Path to uploaded graph image

const Landing = () => {
  // useEffect(() => {
  //   const checkServer = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:7000");
  //       console.log(response.data); // Should output 'Server is running on port 6000'
  //     } catch (error) {
  //       console.error("Error connecting to server:", error);
  //     }
  //   };

  //   checkServer();
  // }, []);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center vh-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white"
      }}
    >
      {/* Heading Section */}
      <div className="container p-4">
        <h1
          className="display-4 fw-bold"
          style={{
            fontFamily: '"Lexend", sans-serif',
            marginTop: "-200px",
          }}
        >
          Adly Influencer
        </h1>
        <p className="lead">
          Welcome to Adly, your global platform connecting influencers and brands for impactful collaborations.
        </p>
        {/* <a href="/learn-more" className="btn btn-primary btn-lg mt-3">
          Learn More
        </a> */}
      </div>

      {/* Analytical Graph Section */}
      <div
        className="mt-5 p-4"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "15px",
          maxWidth: "80%",
        }}
      >
        <div className="row align-items-center">
          {/* Graph Section */}
          <div className="col-md-6">
            <div
              className="position-relative"
              style={{ overflow: "hidden", borderRadius: "15px" }}
            >
              <img
                src={graphImage}
                alt="Analytical Graph"
                className="img-fluid"
              />
              {/* Animated Up Arrow */}
              <div
                className="position-absolute start-50 top-50 translate-middle"
                style={{ animation: "moveUp 2s infinite alternate" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="green"
                  className="bi bi-arrow-up"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 12a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 .708.708L7.5 2.707V11.5A.5.5 0 0 0 8 12z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="col-md-6 text-start">
            <h3 className="fw-bold text-primary">Empowering Growth</h3>
            <p className="text-dark">
              Our platform empowers influencers with the tools they need to
              achieve exponential growth. Connect with global brands and
              transform your potential into reality.
            </p>
            <blockquote className="blockquote text-secondary mt-4">
              <p className="mb-0">
                "Since using Adly, my collaborations have skyrocketed. This
                platform is truly a game-changer!"
              </p>
              <footer className="blockquote-footer text-muted">
                A leading influencer
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
