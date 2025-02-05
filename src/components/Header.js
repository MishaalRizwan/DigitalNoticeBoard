// Header.js
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate(); // Navigation hook

  return (
    <div style={styles.header}>
      <div style={styles.logoSection} onClick={() => navigate("/")}>
        <img src="/path/to/logo.png" alt="NUML Logo" style={styles.logo} />
        <span style={styles.title}>NUML</span>
      </div>
    </div>
  );
};

const styles = {
  header: {
    backgroundColor: "#00AEEF",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px 20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease-in-out",
    cursor: "pointer",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    transition: "transform 0.3s ease-in-out",
  },
  logo: {
    height: "50px",
    transition: "transform 0.3s ease-in-out",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    letterSpacing: "1px",
    transition: "color 0.3s ease-in-out",
  },
};

// Adding hover effect using JavaScript inline styles
document.addEventListener("DOMContentLoaded", () => {
  const logoSection = document.querySelector("[style*='logoSection']");
  if (logoSection) {
    logoSection.addEventListener("mouseover", () => {
      logoSection.style.transform = "scale(1.05)";
    });
    logoSection.addEventListener("mouseout", () => {
      logoSection.style.transform = "scale(1)";
    });
  }
});

export default Header;
