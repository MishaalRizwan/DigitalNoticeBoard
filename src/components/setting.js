import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image, Table } from "react-bootstrap";

const Settings = () => {
  const [settings, setSettings] = useState({
    username: "",
    password: "",
    profilePic: localStorage.getItem("profilePic") || null, // Load from localStorage if available
  });

  const [focalPersons, setFocalPersons] = useState([]); // Focal person details
  const [students, setStudents] = useState([]); // Student details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error message for focal persons
  const [studentError, setStudentError] = useState(""); // Error message for students

  useEffect(() => {
    // Fetch focal person details
    const fetchFocalPersons = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authorization token is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost/my_backend/get_focalperson_details.php",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching focal persons");
        }

        const data = await response.json();
        if (data.success) {
          setFocalPersons(data.focalPersons || []);
        } else {
          setError(data.error || "Error fetching focal persons");
        }
      } catch (error) {
        setError("Error fetching focal persons: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch student details
    const fetchStudents = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setStudentError("Authorization token is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost/my_backend/get_student_details.php",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching students");
        }

        const data = await response.json();
        if (data.success) {
          setStudents(data.students || []);
        } else {
          setStudentError(data.error || "Error fetching students");
        }
      } catch (error) {
        setStudentError("Error fetching students: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    // Call both fetch functions
    fetchFocalPersons();
    fetchStudents();
  }, []); // Empty dependency array ensures this runs only once

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

  const handleUpdateProfilePic = (e) => {
    e.preventDefault();
    alert("Profile picture updated!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authorization token is missing.");
      return;
    }
  
    try {
      const response = await fetch(
        "http://localhost/my_backend/update_admin_settings.php",
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
        // Optionally update localStorage username
        localStorage.setItem("username", settings.username);
      } else {
        alert("Failed to update settings: " + data.error);
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("An error occurred while updating settings.");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Settings</h2>
      
      {/* Username and Password Settings */}
      <Form onSubmit={handleSubmit}>
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

      {/* Focal Person and Student Tables */}
      <h3 className="mt-5">Registered Focal Persons</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {focalPersons.length > 0 ? (
              focalPersons.map((person, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{person.username}</td>
                  <td>{person.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No focal persons found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      <h3 className="mt-5">Registered Students</h3>
      {loading ? (
        <p>Loading...</p>
      ) : studentError ? (
        <p>{studentError}</p>
      ) : (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.username}</td>
                  <td>{student.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Settings;
