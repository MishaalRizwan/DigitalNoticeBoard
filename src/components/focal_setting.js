import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";

const FocalSettings = () => {
  const [settings, setSettings] = useState({
    username: "",
    password: "",
    profilePic: localStorage.getItem("profilePic") || null, // Load from localStorage if available
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setSettings((prevSettings) => ({
          ...prevSettings,
          profilePic: base64String,
        }));
        localStorage.setItem("profilePic", base64String); // Save to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authorization token is missing.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/my_backend/update_focal_settings.php", // Change this to focal settings endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: settings.username,
            password: settings.password,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert("Settings updated successfully!");
        localStorage.setItem("username", settings.username); // Optionally update username in localStorage
      } else {
        alert("Failed to update settings: " + data.error);
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("An error occurred while updating settings.");
    }
  };

  const handleUpdateProfilePic = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authorization token is missing.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/my_backend/update_focal_profile_pic.php", // Change this to focal profile pic endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            profilePic: settings.profilePic,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert("Profile picture updated successfully!");
      } else {
        alert("Failed to update profile picture: " + data.error);
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert("An error occurred while updating profile picture.");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Settings</h2>

      {/* Username and Password Settings */}
      <Form onSubmit={handleUpdateSettings}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={settings.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={settings.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="mt-4">
          Update User Settings
        </Button>
      </Form>

      {/* Profile Picture Settings */}
      <Form onSubmit={handleUpdateProfilePic} className="mt-5">
        <Row className="mt-4">
          <Col md={6}>
            <Form.Group controlId="formProfilePic">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Col>
          <Col md={6} className="text-center">
            {settings.profilePic && (
              <>
                <p>Preview:</p>
                <Image
                  src={settings.profilePic}
                  alt="Profile Preview"
                  roundedCircle
                  width={100}
                  height={100}
                />
              </>
            )}
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="mt-4">
          Update Profile Picture
        </Button>
      </Form>
    </Container>
  );
};

export default FocalSettings;
