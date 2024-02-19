import { Container, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./adminLoginForm.css";
const AdminLoginForm = () => {
  const [validated, setValidated] = useState(false);
  const email = "admin@gmail.com";
  const password = "admin@123";
  const navigate = useNavigate();
  const [inputEmail, setInputEmail] = useState("admin@gmail.com");
  const [inputPassword, setInputPassword] = useState("admin@123");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    if (email === inputEmail && password === inputPassword) {
      alert("login successfull");
      setTimeout(() => {
        navigate("/admin");
      }, 1500);
    } else {
      console.log("please check your email and password");
    }
  };
  const handleChange = (e) => {
    if (e.target.name === "email") {
      setInputEmail(e.target.value);
    } else if (e.target.name === "password") {
      setInputPassword(e.target.value);
    }
  };
  return (
    <div id="admin-login-form-container">
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h5> Admin Login</h5>
          <Form.Group className="mt-3" md={6}>
            <Form.Control
              md={6}
              className="admin-login-input"
              type="email"
              onChange={handleChange}
              placeholder="Email"
              required
              name="email"
              value={inputEmail}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Control
              required
              className="admin-login-input"
              type="password"
              minLength={8}
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={inputPassword}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter atleast 8 characters.
            </Form.Control.Feedback>
          </Form.Group>
          <div className="admin-login-btn-container-2">
            <Button className="admin-login-btn" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};
export default AdminLoginForm;
