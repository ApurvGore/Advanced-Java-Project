import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import emailjs from 'emailjs-com'; // Import emailjs
import { BASE_URL } from "../services/APIconstants";

export function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employee_id: '',
    employeeName: '',
    email: '',
    contact: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    employee_id: '',
    employeeName: '',
    email: '',
    contact: '',
    password: '',
  });
  const [registrationStatus, setRegistrationStatus] = useState("");

  function register(event) {
    event.preventDefault();
    if (validateForm()) {
      let url = `${BASE_URL}/employee/register`;
      axios.post(url, formData)
        .then(response => {
          if (response.data.status) {
            // EmailJS parameters
            const emailParams = {
              to_name: formData.employeeName,
              to_email: formData.email,
              message: `Hello ${formData.employeeName}, you have successfully registered. Your id is ${formData.employee_id}. Your passrord is ${formData.password}. Please wait for Approval.`,
            };

            // Send email using EmailJS
            emailjs.send('service_vd4bfmk', 'template_xb7qzql', emailParams, 'DqVjEjSRmJsYkTzK-')
              .then((result) => {
                  console.log(result.text);
                  // Email sent successfully
              }, (error) => {
                  console.log(error.text);
                  // Handle email sending error
              });

            setRegistrationStatus("success");
            setTimeout(() => {
              navigate("/");
            }, 5000);
          } else {
            setRegistrationStatus("failure");
          }
        })
        .catch(error => {
          console.error("Error during registration:", error);
          setRegistrationStatus("error");
        });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let errorMessage = '';
    switch (fieldName) {
      case 'employee_id':
        const idRegex = /^\d{3}$/;
        errorMessage = idRegex.test(value) ? '' : 'Employee ID must be 3 digits';
        break;
      case 'employeeName':
        errorMessage = value.trim().length >= 4 ? '' : 'Name must be at least 4 characters';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errorMessage = emailRegex.test(value) ? '' : 'Invalid email address';
        break;
      case 'contact':
        const phoneRegex = /^\d{10}$/;
        errorMessage = phoneRegex.test(value) ? '' : 'Phone number must be 10 digits';
        break;
      case 'password':
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        errorMessage = passwordRegex.test(value) ? '' : 'Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one digit';
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [fieldName]: errorMessage }));
  };

  const validateForm = () => {
    let isValid = true;
    Object.keys(formData).forEach(fieldName => {
      const value = formData[fieldName];
      validateField(fieldName, value);
      if (errors[fieldName]) {
        isValid = false;
      }
    });
    return isValid;
  };

  return (
    <div className="signup-container">
      <Container>
        <Col md={{ span: 3, offset: 5 }}>
          <h3>Fill your Details</h3>
        </Col>
        <Form onSubmit={register}>
          {/* Form groups for inputs */}
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Form.Group className="mb-3" controlId="formBasicEmpId">
                <Form.Label>Employee ID</Form.Label>
                <Form.Control type="text" value={formData.employee_id} name="employee_id" placeholder="Enter Employee id" onChange={handleChange} onBlur={() => validateField("employee_id", formData.employee_id)} required />
                {errors.employee_id && <span style={{ color: "red" }}>{errors.employee_id}</span>}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Form.Group className="mb-3" controlId="formBasicEmpName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={formData.employeeName} name="employeeName" placeholder="Enter full name" onChange={handleChange} onBlur={() => validateField("employeeName", formData.employeeName)} required />
                {errors.employeeName && <span style={{ color: "red" }}>{errors.employeeName}</span>}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" value={formData.email} name="email" placeholder="Enter email" onChange={handleChange} onBlur={() => validateField("email", formData.email)} required />
                {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Form.Group className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control type="text" value={formData.contact} name="contact" placeholder="Enter Contact Number" onChange={handleChange} onBlur={() => validateField("contact", formData.contact)} required />
                {errors.contact && <span style={{ color: "red" }}>{errors.contact}</span>}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={formData.password} name="password" placeholder="Password" onChange={handleChange} onBlur={() => validateField("password", formData.password)} required />
                {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
              </Form.Group>
            </Col>
          </Row>
          <Col md={{ span: 6, offset: 3 }} className="text-center">
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Col>
        </Form>
        {registrationStatus === "success" && <Alert variant="success">Registration successful! Redirecting to login...</Alert>}
        {registrationStatus === "failure" && <Alert variant="danger">Registration failed. Please try again.</Alert>}
        {registrationStatus === "error" && <Alert variant="warning">An error occurred. Please try again later.</Alert>}
      </Container>
    </div>
  );
}
