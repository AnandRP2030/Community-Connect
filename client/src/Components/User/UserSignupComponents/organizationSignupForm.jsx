import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosMultipartInstance from "../../../api/axiosMultipartInstance";
import "./signupForm.css";
const OrganizationSignupForm = () => {
  const [orgData, setOrgData] = useState({
    name: "",
    ownerName: "",
    email: "",
    password: "",
    address: "",
    state: "",
    pincode: "",
    phoneNumber: "",
    img: null,
  });
  const handleChange = (e) => {
    setOrgData({ ...orgData, [e.target.name]: e.target.value });
  };

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const handleFilechange = (e) => {
    setOrgData({ ...orgData, img: e.target.files[0] });
  };
  const handleCheckboxChange = (e) => {
    setAgreedToTerms(e.target.checked);
  };

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    if (
      !orgData.name ||
      !orgData.ownerName ||
      !orgData.email ||
      !orgData.password ||
      !orgData.address ||
      !orgData.state ||
      !orgData.pincode ||
      !orgData.phoneNumber
    ) {
      console.log("Please fill all the fields");
      return;
    } else {
      if (!agreedToTerms) {
        console.log("Not checked");
        return;
      }
      if (orgData.phoneNumber.length !== 10) {
        console.log("Phone number must be 10 digits");
        return;
      }

      if (!isValidEmail(orgData.email)) {
        console.log("Invalid email");
        return;
      }

      sendDataToServer(orgData);
    }
  };
  const sendDataToServer = async (orgData) => {
    try {
      const response = await axiosMultipartInstance.post(
        "organization/signup",
        orgData
      );
      if (response.status === 201) {
        console.log("organization registration successful");
        alert("Registration successful.");
        setTimeout(() => {
          navigate("/user/login");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400) {
        alert(error.response.data.message);
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <Form
      id="user-signup-form-input"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            required
            type="text"
            placeholder="Organization Name"
            name="name"
            onChange={handleChange}
            value={orgData.name}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your organization name
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Owner Name"
            required
            name="ownerName"
            onChange={handleChange}
            value={orgData.ownerName}
          />
          <Form.Control.Feedback type="invalid">
            Please Enter Owner Name
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            required
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={orgData.email}
          />
          <Form.Control.Feedback type="invalid">
            Please Enter valid email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            required
            type="password"
            minLength={8}
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={orgData.password}
          />
          <Form.Control.Feedback type="invalid">
            Please Enter atleast 8 characters.
          </Form.Control.Feedback>
          <Form.Control.Feedback>
            Your password is strong.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Address"
            required
            name="address"
            onChange={handleChange}
            value={orgData.address}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a your address.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            minLength={10}
            maxLength={10}
            pattern="[0-9]{10}"
            placeholder="Phone Number"
            required
            onChange={handleChange}
            value={orgData.phoneNumber}
            name="phoneNumber"
    
          />
          <Form.Control.Feedback type="invalid">
            Please provide 10 digit Phone number.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="State"
            name="state"
            onChange={handleChange}
            value={orgData.state}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide your state name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="pincode"
            onChange={handleChange}
            value={orgData.pincode}
            type="number"
            placeholder="Pincode"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide your pincode.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <Form.Group className="position-relative mt-3">
        <Form.Label>Upload your photo</Form.Label>
        <Form.Control
          type="file"
          name="file"
          accept="image/*"
          onChange={handleFilechange}
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Check
          required
          className="signup-check-box"
          label="Agree to our terms and conditions"
          feedbackType="invalid"
          checked={agreedToTerms}
          onChange={handleCheckboxChange}
        />
      </Form.Group>

      <div className="signup-form-flex-div">
        <Button id="user-signup-btn" type="submit">
          Sign UP
        </Button>
      </div>
    </Form>
  );
};
export default OrganizationSignupForm;
