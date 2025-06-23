import React, { useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

// Ensure the image paths are correct
import backgroundImage1 from '../assets/c1.jpg';
import backgroundImage2 from '../assets/c2.jpg';
import backgroundImage3 from '../assets/c3.jpg';
import backgroundImage4 from '../assets/c4.jpg';

import './Landing.css';

const images = [backgroundImage1, backgroundImage2, backgroundImage3, backgroundImage4];

const Home = () => {
  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await axios.get('http://localhost:7000');
        console.log(response.data);
      } catch (error) {
        console.error('Error connecting to server:', error);
        alert('Could not connect to the server. Please try again later.');
      }
    };
    checkServer();
  }, []);

  return (
    <div className="home-container">
      <div className="image-slider-container">
        <motion.div
          className="image-slider"
          animate={{ x: ['0%', '-100%'] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
        >
          {[...images, ...images].map((src, index) => (
            <div key={index} className="image-container">
              <img src={src} alt={`College Voting ${index + 1}`} className="main-image" onError={(e) => console.error("Image not loading:", e.target.src)} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const Landing = () => {
  return (
    <>
      <Navbar />
      <Home /> {/* Image Slider is now above the header */}
      <Container>
        <header className="hero">
          <h1 className="hero-title">Your Future, Your Voice, Vote Today!</h1>
          <p className="hero-subtitle">Shape the future of your college with your vote. Every vote counts!</p>
          <a href="/register" className="hero-button">Vote Now</a>
        </header>

        <footer className="footer">
          <p>&copy; 2025 All rights reserved | College Voting System</p>
        </footer>
      </Container>
    </>
  );
};

export default Landing;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;
