import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "react-toastify/dist/ReactToastify.css";
import "./nav-bar.css";

const Navbar = ({ userType }) => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  // Retrieve the profile picture and username from localStorage
  const profilePic = localStorage.getItem("profilePic") || "/default-img.png";
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear localStorage data
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("profilePic");

        // Show toast notification
        toast.success("You have been logged out.", {
          position: "top-right",
          autoClose: 2000,
          className: "toast-blue",
        });

        // Redirect after logout
        setTimeout(() => {
          navigate(userType === "admin" ? "/admin-login" : "/focal-login");
        }, 3000);
      }
    });
  };

  return (
    <header className="content1">
      <div className="content-child" />
      <img
        className="image-1-icon2"
        loading="lazy"
        alt="Logo"
        src="/image-1@2x.png"
      />
      <div className="number-panel">
        <a className="numl2">NUML</a>
      </div>
      <div style={{ flexGrow: 1 }} />
      <div className="user-info">
        {username && (
          <>
            <img
              className="profile-pic"
              src={profilePic}
              alt="Profile"
              title="Profile picture"
            />
            <span className="user-greeting">{`Hello, ${username}`}</span>
          </>
        )}
      </div>
      <button className="logout-button" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i> Logout
      </button>
      <ToastContainer />
    </header>
  );
};

export default Navbar;
