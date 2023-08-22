import React from 'react';
import { useNavigate } from 'react-router-dom';
import './homePage.css';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Replace '/login' with the path to your login page
  };

  return (
    <div className="container">
      <div className="background-image"></div>
      <div className="overlay">
        <div className="text-wrapper">
          <h1 className="animated-text">
            Your next big idea starts here.
            <br />
            "Work better, safer, together."
          </h1>
        </div>
      </div>

      <div className="button-wrapper">
        <button onClick={handleLoginClick}>Go to Login</button>
      </div>

      <div className="content">
        {/* Your page content goes here */}
      </div>
    </div>
  );
};

export default Home;