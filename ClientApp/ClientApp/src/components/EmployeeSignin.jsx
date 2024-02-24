import { useState, useEffect } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/UserServices.js";
import "./Signin.css";

export function EmployeeSignin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Or navigate to a specific dashboard route based on the role
    }
  }, [navigate]); // Dependency array with navigate to ensure effect is correctly handled on navigate change

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(formData);
  
      if (result.status && result.approval === 1) {
        localStorage.setItem("token", result.token);
        const userRole = result.roll;
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("employeeId", result.employeeId); // Save employeeId to local storage
        navigate("/"); // Redirect to the home page after successful login
      } else if (result.status && result.approval === 0) {
        setLoginError("Your membership is not approved yet, wait for approval.");
      } else {
        setLoginError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setLoginError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <Container>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <div className="signin-window">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </div>
              </Form>
              {loginError && (
                <Alert variant="danger" className="mt-3">
                  {loginError}
                </Alert>
              )}
            </div>
          </Col>
          <br />
          <br />
          <Col md={{ span: 4, offset: 4 }}>
            <p>Not a registered member yet?</p>
            <Link to="/signup">Click Here to Sign Up</Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
