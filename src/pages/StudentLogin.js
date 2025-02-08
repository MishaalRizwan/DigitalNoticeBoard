import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupComponent from "../components/GroupComponent";
import Swal from 'sweetalert2'; // Import SweetAlert2
import "./StudentLogin.css";

const StudentLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onArrowImageClick = useCallback(() => {
    navigate("/user");
  }, [navigate]);

  const onDontHaveAnClick = useCallback(() => {
    navigate("/student-signup");
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Username and password are required!',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost/my_backend/student_login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Store the JWT token and username in localStorage
        localStorage.setItem("token", result.token);
        localStorage.setItem("username", username);

         Swal.fire({
                  icon: 'success',
                  title: 'Login Successful!',
                  text: 'Redirecting to your dashboard...',
                  timer: 1500,
                  showConfirmButton: false,
                });
        
                setTimeout(() => {
                  navigate("/student-dashboard");
                }, 1500);
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Login Failed',
                  text: result.error || "Invalid username or password.",
                });
              }
            } catch (error) {
              console.error("Error during login:", error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "An error occurred during login.",
              });
            } finally {
              setLoading(false);
            }
          };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="student-login">
      <img className="back-icon" alt="" src="/back@2x.png" />
      <header className="rectangle-parent">
        <div className="frame-child" />
        <img className="image-1-icon" loading="lazy" alt="" src="/image-1@2x.png" />
        <div className="numl-container">
          <a className="numl">NUML</a>
        </div>
      </header>

      <main className="content">
        <section className="header">
          <img
            className="arrow-icon"
            loading="lazy"
            alt="arrow"
            src="/arrow@2x.png"
            onClick={onArrowImageClick}
          />
          <div className="title">
            <div className="frame-parent">
              <div className="frame-group">
                <form className="rectangle-group" onSubmit={handleLogin}>
                  <div className="frame-item" />
                  <div className="welcome-message">
                    <h3 className="welcome">Welcome!</h3>
                    <div className="welcome-message-inner">
                      <div className="frame-container">
                        <div className="sign-in-to-wrapper">
                          <h2 className="sign-in-to">{"Login to "}</h2>
                        </div>
                        <h1 className="student">Student</h1>
                      </div>
                    </div>
                  </div>

                  <div className="credentials">
                    <GroupComponent
                      userName="User name"
                      enterYourPasswordPlaceholder="Enter your user name"
                      propWidth="151px"
                      propColor="#b0bec5"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="password-field">
                    <GroupComponent
                      userName="Password"
                      enterYourPasswordPlaceholder="Enter your Password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="toggle-password-visibility"
                      onClick={togglePasswordVisibility}
                    >
                      <img
                        src={showPassword ? "/eyeslash.svg" : "/eye.svg"}
                        alt={showPassword ? "Hide Password" : "Show Password"}
                      />
                    </button>
                  </div>

                  <div className="options">
                    <button className="rectangle-container" type="submit" disabled={loading}>
                      <div className="frame-inner" />
                      <div className="login-button">
                        <img className="icon-login" alt="" src="/-icon-login.svg" />
                      </div>
                      <b className="login">{loading ? "Loading..." : "Login"}</b>
                    </button>
                  </div>

                  <div className="register">
                    <div className="dont-have-an-container" onClick={onDontHaveAnClick}>
                      <span className="dont-have-an">Don’t have an Account?</span>
                      <span className="register1">
                        <span className="span">{" "}</span>
                        <span className="register2">Register</span>
                      </span>
                    </div>
                  </div>
                </form>
                <div className="footer">
                  <img
                    className="whatsapp-image-2024-09-17-at-1-icon"
                    loading="lazy"
                    alt="footer"
                    src="/whatsapp-image-20240917-at-134552-3474d975removebg-1@2x.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

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
                National University of Modern Languages
              </h4>
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

export default StudentLogin;
