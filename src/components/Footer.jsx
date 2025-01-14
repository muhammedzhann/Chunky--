import React from "react";
import "../style/Footer.css"; // Include the CSS file for styling

const Footer = () => {
  const links = [
    "Term Policy",
    "Delivery Policy",
    "Privacy Policy",
    "Electronic Commerce Authentication Certificate",
  ];

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Column: Important Links */}
        <div className="footer-column">
          <h4 className="footer-title">Important Links</h4>
          <ul>
            {links.map((link, index) => (
              <li key={index} style={{ "--index": index }}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column: Contact Us */}
        <div className="footer-column">
          <h4 className="footer-title">Contact Us</h4>
          <ul>
            <li style={{ "--index": 0 }}>
              <i className="fa fa-whatsapp"></i> 0539391455
            </li>
            <li style={{ "--index": 1 }}>
              <i className="fa fa-phone"></i> 0539391455
            </li>
            <li style={{ "--index": 2 }}>
              <i className="fa fa-envelope"></i> customer@cookiezo.com
            </li>
          </ul>
        </div>

        {/* Column: Main Links */}
        <div className="footer-column">
          <h4 className="footer-title">Main Links</h4>
          <ul>
            <li style={{ "--index": 0 }}>
              <a href="#home">Home</a>
            </li>
            <li style={{ "--index": 1 }}>
              <a href="#about">About Cookiezo</a>
            </li>
            <li style={{ "--index": 2 }}>
              <a href="#products">Products and Offers</a>
            </li>
            <li style={{ "--index": 3 }}>
              <a href="#business">Business Services</a>
            </li>
            <li style={{ "--index": 4 }}>
              <a href="#gallery">Gallery</a>
            </li>
          </ul>
        </div>

        {/* Column: Cookizo Info */}
        <div className="footer-column">
          <h4 className="footer-title">Cookizo</h4>
          <p>Cookizo for preparing sweets</p>
          <ul className="social-icons">
            <li>
              <i className="fa fa-tiktok"></i>
            </li>
            <li>
              <i className="fa fa-facebook"></i>
            </li>
            <li>
              <i className="fa fa-instagram"></i>
            </li>
            <li>
              <i className="fa fa-twitter"></i>
            </li>
            <li>
              <i className="fa fa-whatsapp"></i>
            </li>
          </ul>
          <p>Tax Number: 301124363900003</p>
          <p>Commercial Register: 1010932922</p>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <hr />
        <p>Made By Cookiezo © 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
