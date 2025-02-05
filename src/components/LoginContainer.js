import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./LoginContainer.css";

const LoginContainer = ({ className = "" }) => {
  const navigate = useNavigate();

  const onLoginClick = useCallback((role) => {
    const routes = {
      student: "/student-login",
      focal: "/focal-login",
    };
    navigate(routes[role]);
  }, [navigate]);

  const onSignUpClick = useCallback((role) => {
    const routes = {
      student: "/student-signup",
      focal: "/focal-signup",
    };
    navigate(routes[role]);
  }, [navigate]);

  return (
    <div className={`login-container ${className}`}>
      <div className="login-form">
        {/* Student Section */}
        <div className="login-inputs">
          <div className="login-inputs-child" />
          <div className="user-field">
            <b className="student2">STUDENT</b>
          </div>
          <div className="login-parent">
            <button className="login6" onClick={() => onLoginClick("student")}>
              <div className="login-child" />
              <div className="duck-login">
                <img className="icon-login2" alt="" src="/-icon-login1.svg" />
              </div>
              <b className="login7">Login</b>
            </button>
            <button className="sign-up" onClick={() => onSignUpClick("student")}>
              <div className="sign-up-child" />
              <div className="vector-wrapper">
                <img className="vector-icon" alt="" src="/vector.svg" />
              </div>
              <b className="sign-up1">Sign Up</b>
            </button>
          </div>
        </div>

        {/* Focal Person Section */}
        <div className="login-inputs1">
          <div className="login-inputs-child" />
          <b className="focal-person2">FOCAL PERSON</b>
          <div className="login-inputs-inner">
            <div className="login-group">
              <button className="login8" onClick={() => onLoginClick("focal")}>
                <div className="login-child" />
                <div className="icon-login-wrapper">
                  <img className="icon-login2" alt="" src="/-icon-login-1.svg" />
                </div>
                <b className="login7">Login</b>
              </button>
              <button className="sign-up2" onClick={() => onSignUpClick("focal")}>
                <div className="sign-up-child" />
                <div className="vector-wrapper">
                  <img className="vector-icon" alt="" src="/vector.svg" />
                </div>
                <b className="sign-up1">Sign Up</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginContainer.propTypes = {
  className: PropTypes.string,
};

export default LoginContainer;
