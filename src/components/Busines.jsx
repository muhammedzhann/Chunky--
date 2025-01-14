import React from "react";
import "../style/Busines.css"; // Import stylesheet

const Busines = () => {
  return (
    <div id='busi' className="business-container">
      <div className="business-content">
        <h1 className="business-heading">Business services</h1>
        <p className="business-text">
          At Cookiezo, we’re here to support restaurants, cafes, and hotels with
          premium, customized recipes designed to meet your unique market
          needs. From preparation to packaging and delivery, we provide seamless
          solutions that ensure quality and convenience every step of the way.
        </p>
        <p className="business-highlight">
          Let’s work together to bring fresh, delicious offerings to your
          customers.{" "}
          <strong>
            Contact us today to explore how Cookiezo can elevate your business!
          </strong>
        </p>
        <button className="business-button">
          <i className="fa fa-phone"></i> Contact us
        </button>
      </div>
    </div>
  );
};

export default Busines;
