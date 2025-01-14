import React from "react";
import "../style/Main.css"; // Подключение файла стилей

const Home = () => {
  return (
    <div id="home" className="hero">
      <div className="overlay">
        <div className="container text-start">
          <h1 className="card-title">
            Welcome to Cookiezo! <span role="img" aria-label="cookie">🍪</span>
          </h1>
          <p className="card-text">
            Your trusted cloud bakery for indulgent, handcrafted cookies made with the finest Belgian chocolate.
            And let’s not forget our soft, freshly baked cinnamon rolls, available in a variety of mouthwatering flavors.
          </p>
          <div className="working-hours">
            <i className="fa fa-clock"></i> Working hours: <strong>9 AM to 11 PM</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
