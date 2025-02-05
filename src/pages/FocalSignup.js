import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InputFields from "../components/InputFields";
import "./FocalSignup.css";

const FocalSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onArrowImageClick = useCallback(() => {
    navigate("/user");
  }, [navigate]);

  const onAlreadyHaveAnClick = useCallback(() => {
    navigate("/focal-login");
  }, [navigate]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");
    setSuccessMessage("");
    setErrorMessage("");

    let hasError = false;

    // Validate email format
    if (!validateEmail(email)) {
      setEmailError("Enter a valid email.");
      hasError = true;
    }

    // Validate password format
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long, contain one number, and one special character.");
      hasError = true;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      hasError = true;
    }

    if (hasError) {
      return; // Stop signup process if there are errors
    }

    try {
      const response = await fetch("http://localhost/my_backend/focal_signup.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage("Signup successful!"); // Set success message
        navigate("/success"); // Redirect to success page
      } else {
        setErrorMessage(result.error); // Display error message from the server
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("An error occurred during signup.");
    }
  };

  return (
    <div className="focal-signup">
      <img className="back-icon1" alt="" src="/back@2x.png" />
      <header className="frame-header">
        <div className="rectangle-div" />
        <img className="image-1-icon1" loading="lazy" alt="" src="/image-1@2x.png" />
        <div className="numl-wrapper">
          <a className="numl1">NUML</a>
        </div>
      </header>
      <main className="focal-signup-inner">
        <section className="frame-section">
          <div className="frame-div">
            <div className="arrow-parent">
              <img
                className="arrow-icon1"
                loading="lazy"
                alt=""
                src="/arrow@2x.png"
                onClick={onArrowImageClick}
              />
              <div className="placeholder-background-wrapper">
                <img
                  className="placeholder-background-icon"
                  loading="lazy"
                  alt=""
                  src="/32934651-1@2x.png"
                />
              </div>
            </div>
            <div className="frame-wrapper">
              <form className="group-form" onSubmit={handleSignup}>
                <div className="frame-child1" />
                <div className="frame-parent1">
                  <div className="welcome-wrapper">
                    <h3 className="welcome1">Welcome !</h3>
                  </div>
                  <div className="sign-up-to-parent">
                    <h2 className="sign-up-to">{`Sign up to `}</h2>
                    <div className="focal-person-wrapper">
                      <h1 className="focal-person">Focal-person</h1>
                    </div>
                  </div>
                </div>
                
                {/* Input Fields */}
                <InputFields 
                  label="Email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
                {emailError && <div className="error-message small-text">{emailError}</div>}
                <InputFields 
                  label="User Name" 
                  placeholder="Enter your user name" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} 
                />
                <InputFields 
                  label="Password" 
                  placeholder="Enter your password" 
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <InputFields 
                  label="Confirm Password" 
                  placeholder="Confirm your password" 
                  value={confirmPassword}
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                />
                {passwordError && <div className="error-message small-text">{passwordError}</div>}
                
                {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
                {successMessage && <div className="success-message">{successMessage}</div>} {/* Display success message */}

                <button type="submit" className="group-button">
                  <div className="frame-child2" />
                  <img className="button-icon" alt="" src="/button-icon.svg" />
                  <div className="register-wrapper">
                    <b className="register3">Register</b>
                  </div>
                </button>
                
                <div className="already-have-an-account-logi-wrapper">
                  <div className="already-have-an-container" onClick={onAlreadyHaveAnClick}>
                    <span className="already-have-an">Already have an Account?</span>
                    <span className="login1">
                      <span className="span1">{`  `}</span>
                      <span className="login2">Login</span>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

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

export default FocalSignup;
