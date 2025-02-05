import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupComponent2 from "../components/GroupComponent2";
import InputFields from "../components/InputFields";
import "./AdminSignup.css";


const AdminSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const onArrowImageClick = useCallback(() => {
    navigate("/user");
  }, [navigate]);

  const onAlreadyHaveAnClick = useCallback(() => {
    navigate("/admin-login");
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
      const response = await fetch("http://localhost/my_backend/signup.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage("Signup successful!"); // Set success message
        setTimeout(() => {
          navigate("/admin-login"); // Redirect to login page after 2 seconds
        }, 2000);
     } else {
        setErrorMessage(result.error); // Display error message from the server
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("An error occurred during signup.");
    }
  };

  return (
    <div className="admin-signup">
      <img className="back-icon4" alt="" src="/back@2x.png" />
      <header className="content2">
        <div className="content-item" />
        <img className="image-1-icon4" loading="lazy" alt="" src="/image-1@2x.png" />
        <div className="number1">
          <a className="numl4">NUML</a>
        </div>
      </header>
      <main className="header1">
        <section className="arrow-container">
          <img className="arrow-icon3" loading="lazy" alt="" src="/arrow@2x.png" onClick={onArrowImageClick} />
          <div className="field-container">
            <div className="input-wrapper">
              <div className="input-area">
                <div className="numeric-label">
                  <img className="placeholder-icon" loading="lazy" alt="" src="/32934651-1@2x.png" />
                </div>
                <form className="rectangle-parent4" onSubmit={handleSignup}>
                  <div className="frame-child6" />
                  <div className="welcome-message1">
                    <div className="welcome-container">
                      <h3 className="welcome3">Welcome!</h3>
                    </div>
                    <div className="signup-label">
                      <div className="sign-up-to-wrapper">
                        <h2 className="sign-up-to1">{`Sign up to `}</h2>
                      </div>
                      <h1 className="admin1">Admin</h1>
                    </div>
                  </div>
                  <div className="input-fields-container">
                    <GroupComponent2
                      propPosition="unset"
                      propTop="unset"
                      propLeft="unset"
                      propFlex="1"
                      propOverflow="hidden"
                      propHeight="88.4px"
                      propPadding="0px 0px 5px"
                      confrimPassword="Email"
                      enterYourPasswordPlaceholder="Enter your email"
                      propWidth="115px"
                      propColor="#ababab"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <div className="error-message small-text">{emailError}</div>}
                    <InputFields
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="input-fields3">
                      <GroupComponent2
                        propPosition="absolute"
                        propTop="0px"
                        propLeft="0px"
                        propFlex="unset"
                        propOverflow="unset"
                        propHeight="unset"
                        propPadding="unset"
                        confrimPassword="Password"
                        enterYourPasswordPlaceholder="Enter your Password"
                        propWidth="146px"
                        propColor="#ababab"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <img className="invisible-1-icon4" loading="lazy" alt="" src="/invisible-1.svg" />
                    </div>
                  </div>
                  <div className="input-fields4">
                    <GroupComponent2
                      confrimPassword="Confirm Password"
                      enterYourPasswordPlaceholder="Confirm your Password"
                      propWidth="166px"
                      propColor="#ababab"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <img className="invisible-1-icon4" alt="" src="/invisible-1-11.svg" />
                  </div>
                  {passwordError && <div className="error-message small-text">{passwordError}</div>}
                  {errorMessage && <div className="error-message small-text">{errorMessage}</div>}
                  {successMessage && <div className="success-message">{successMessage}</div>}
                  <button type="submit" className="rectangle-parent5">
                    <div className="frame-child7" />
                    <img className="button-icon1" alt="" src="/button-icon1.svg" />
                    <div className="button-label">
                      <b className="register6">Register</b>
                    </div>
                  </button>
                  <div className="login-link">
                    <div className="already-have-an-container1" onClick={onAlreadyHaveAnClick}>
                      <span className="already-have-an1">Already have an Account?</span>
                      <span className="login4">
                        <span className="span3">{`  `}</span>
                        <span className="login5">Login</span>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
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

export default AdminSignup;
