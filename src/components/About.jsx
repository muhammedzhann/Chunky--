import React from 'react'
import "../style/AboutPage.css";

const About = () => {
  return (
    <div id='about' className="about-container">
      <h1 className="about-title">About Chunky</h1>
      <p className="about-description">
        At Cookiezo, we’re passionate about bringing you freshly baked goodness every single day. With high-quality ingredients and a touch of love, every bite is a celebration of flavor and care. Whether you’re indulging yourself or sharing with loved ones, we’re here to make your moments sweeter.
      </p>
      <div className="about-features">
        <div className="feature-item">
          <i className="fa fa-fire"></i>
          <p>Careful Baking</p>
        </div>
        <div className="feature-item">
          <i className="fa fa-gem"></i>
          <p>Tidy Presentation</p>
        </div>
        <div className="feature-item">
          <i className="fa fa-clock"></i>
          <p>Fast Delivery</p>
        </div>
      </div>
    </div>
  );
};

export default About;
