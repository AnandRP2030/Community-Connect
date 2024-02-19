import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosMultipartInstance from "../../../api/axiosMultipartInstance";
import "./signupForm.css";
const UserSignupForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    age: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    nationality: "",
    pincode: "",
    img: null,
  });
  const [validated, setValidated] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFilechange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.files[0] });
  };
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // form validation
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.email ||
      !userData.password ||
      !userData.gender ||
      !userData.phoneNumber ||
      !userData.age ||
      !userData.street ||
      !userData.city ||
      !userData.state ||
      !userData.pincode ||
      !userData.nationality
    ) {
      console.log("Please fill all the fields");
      return;
    } else {
      if (!agreedToTerms) {
        console.log("Not checked");
        return;
      }
      if (userData.phoneNumber.length !== 10) {
        console.log("Phone number must be 10 digits");
        return;
      }
      if (!isValidEmail(userData.email)) {
        console.log("Invalid email");
        return;
      }

      sendDataToServer(userData);
    }
  };

  const handleCheckboxChange = (e) => {
    setAgreedToTerms(e.target.checked);
  };

  const redirectLogin = () => {
    navigate("/user/login");
  };
  const sendDataToServer = async (data) => {
    try {
      const response = await axiosMultipartInstance.post("/user/signup", data);
      if (response.status === 201) {
        console.log("user created successfully");
        alert("Registration successful.");
        setTimeout(() => {
          navigate("/user/login");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400) {
        alert(error.response.data.message);
      }else {
        alert(error.message)
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
            placeholder="First name"
            name="firstName"
            onChange={handleChange}
            value={userData.firstName}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your first name!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            required
            type="text"
            value={userData.lastName}
            placeholder="Last name"
            name="lastName"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please Enter your lastname.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            required
            as="select"
            type="select"
            name="gender"
            onChange={handleChange}
            value={userData.gender}
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select your gender.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            onChange={handleChange}
            name="age"
            value={userData.age}
            type="number"
            placeholder="Your age"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please Enter your age
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            required
            type="email"
            placeholder="Email"
            value={userData.email}
            name="email"
            onChange={handleChange}
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
            value={userData.password}
          />
          <Form.Control.Feedback type="invalid">
            Please Enter atleast 8 characters.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            name="street"
            onChange={handleChange}
            value={userData.street}
            type="text"
            placeholder="Street"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a your street.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="city"
            onChange={handleChange}
            value={userData.city}
            type="text"
            placeholder="City"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide your city name.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            name="state"
            onChange={handleChange}
            value={userData.state}
            type="text"
            placeholder="State"
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
            value={userData.pincode}
            type="number"
            placeholder="Pincode"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide your pincode.
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            name="nationality"
            onChange={handleChange}
            value={userData.nationality}
            type="text"
            placeholder="Nationality"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide your Nationality
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Control
            required
            type="text"
            minLength={10}
            maxLength={10}
            placeholder="Phone Number"
            name="phoneNumber"
            onChange={handleChange}
            value={userData.phoneNumber}
            pattern="[0-9]{10}"
          />
          <Form.Control.Feedback type="invalid">
            Please Enter 10 digits phone Number.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <Form.Group className="position-relative mt-3">
        <Form.Label>Upload your photo</Form.Label>
        <Form.Control
          onChange={handleFilechange}
          type="file"
          name="img"
          accept="image/*"
        />
      </Form.Group>
      <div className="signup-form-flex-div">
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

        <p className="mt-3">
          {" "}
          Already have an account?{" "}
          <span className="redirect-login" onClick={redirectLogin}>
            Login
          </span>{" "}
        </p>
      </div>

      <div className="signup-form-flex-div">
        <Button id="user-signup-btn" type="submit">
          Sign UP
        </Button>
      </div>
    </Form>
  );
};
export default UserSignupForm;
