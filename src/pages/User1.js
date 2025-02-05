import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import LoginContainer from "../components/LoginContainer";
import "./User1.css";

const User1 = () => {
  const navigate = useNavigate(); // Create navigate function

  // Navigate to Admin Login page when the button is clicked
  const handleAdminLogin = useCallback(() => {
    navigate("/admin-login");
  }, [navigate]);

  return (
    <div className="user">
      <header className="content1">
        <div className="content-child" />
        <img
          className="image-1-icon2"
          loading="lazy"
          alt="NUML Logo"
          src="/image-1@2x.png"
        />
        <div className="number-panel">
          <a className="numl2">NUML</a>
        </div>

        {/* Admin Button in the Nav Bar */}
        <button 
          className="admin-button" 
          onClick={handleAdminLogin}
        >
          Admin
        </button>
      </header>

      <section className="side-panel">
        <div className="login-container-parent">
          <LoginContainer />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-container">
          {/* Left Section */}
          <div className="footer-left">
            <div className="footer-contact">
              <h4>
              <img 
            src="/image-1@2x.png" 
            alt="NUML Logo" 
            className="footer-logo" 
            style={{ width: "30px", height: "30px", marginRight: "10px" }} 
          />
                National University of Modern Languages</h4>
              <p>Khadim Hussain Rd, Lalazar, Rawalpindi</p>
              <p>📞 +92-51-9265100</p>
              <p>✉️ info@numl.edu.pk</p>
            </div>
            <div className="footer-social-icons">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                <img src="/facebook_icon.svg" alt="Facebook" />
              </a>
              <a href="https://youtube.com/" target="_blank" rel="noreferrer">
                <img src="/youtube_icon.svg" alt="YouTube" />
              </a>
            </div>
          </div>

          {/* Center Section */}
          <div className="footer-center">
            <h4>Online Resources</h4>
            <ul>
              <li>B ICON Training Feedback</li>
              <li>Examination Rules</li>
              <li>NUML Faculty Abstracts</li>
              <li>Psychological Counseling</li>
              <li>Degree Attestation</li>
              <li>Directory of Theses</li>
              <li>Access of Publications</li>
              <li>Degree Equivalence</li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="footer-right">
            <h4>About Us</h4>
            <div className="campuses">
              <div>About NUML</div>
              <div>Our Vision</div>
              <div>Our Goal</div>
              <div>Our Values</div>
              <div>Jobs</div>
              <div>FAQs</div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom">
          <p>
            2024 © NUML All Rights Reserved developed by{" "}
            <a href="https://ict.numl.edu.pk/" target="_blank" rel="noreferrer">
              ICT Department
            </a>{" "}
            |{" "}
            <a href="/privacy-policy" target="_blank" rel="noreferrer">
              Privacy Policy
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default User1;
