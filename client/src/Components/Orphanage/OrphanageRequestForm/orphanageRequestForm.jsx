import "./orphanageRequestForm.css";
import { useState, useEffect } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosMultipartInstance from "../../../api/axiosMultipartInstance";
import axiosInstance from "../../../api/BaseUrl";
const OrphanageRequestForm = ({ orpData }) => {
  const [donationReqData, setDonationReqData] = useState({
    orphanageId: "",
    title: "",
    targetAmount: "",
    bankAcNumber: "",
    deadline: "",
    category: "",
    urgencyLevel: "",
    description: "",
  });
  const [validated, setValidated] = useState(false);
  useEffect(() => {
    if (orpData) {
      setDonationReqData({ ...donationReqData, orphanageId: orpData._id });
    }
  }, [orpData]);
  const handleChange = (e) => {
    setDonationReqData({ ...donationReqData, [e.target.name]: e.target.value });
  };

  // form validation
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (
      !donationReqData.orphanageId ||
      !donationReqData.title ||
      !donationReqData.targetAmount ||
      !donationReqData.bankAcNumber ||
      !donationReqData.deadline ||
      !donationReqData.category ||
      !donationReqData.urgencyLevel ||
      !donationReqData.description
    ) {
      console.log("Please fill all the fields");
      return;
    } else {
      sendDataToServer(donationReqData);
    }
  };

  const redirectLogin = () => {
    alert("request success ful");
  };

  const sendDataToServer = async (data) => {
    try {
      const response = await axiosInstance.post(
        "donation-request/create-donation-request",
        data
      );

      if (response.status === 201) {
        console.log("user created successfully");
        alert("Request successful.");
        setTimeout(() => {
          // navigate("/user/login");
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
    <div className="w-50 mt-5 mx-auto bg-gray mb-5 pb-5 orp-req-box rounded">
      <Form
        className="mx-auto"
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
              placeholder="Request Title"
              name="title"
              onChange={handleChange}
              value={donationReqData.title}
            />
            <Form.Control.Feedback type="invalid">
              Please specify the request title.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              required
              type="number"
              placeholder="Amount Needed"
              name="targetAmount"
              onChange={handleChange}
              value={donationReqData.targetAmount}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your target amount!
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="signup-form-flex-div">
          <Form.Group>
            <Form.Control
              required
              type="text"
              placeholder="Bank Name"
              name="bank-name"
            />
            <Form.Control.Feedback type="invalid">
              Please specify the bank name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              required
              type="number"
              placeholder="Bank IFSC Number"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your bank IFSC
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="signup-form-flex-div">
          <Form.Group>
            <Form.Control
              required
              type="number"
              name="bankAcNumber"
              placeholder="Bank Account Number"
              onChange={handleChange}
              value={donationReqData.bankAcNumber}
            />
            <Form.Control.Feedback type="invalid">
              Please provide your bank account number.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              required
              type="date"
              value={donationReqData.deadline}
              name="deadline"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide the deadline of this request.
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="signup-form-flex-div">
          <Form.Group>
            <Form.Control
              required
              as="select"
              type="select"
              name="category"
              onChange={handleChange}
              value={donationReqData.category}
            >
              <option value="">Select Request Category</option>
              <option value="education">Education</option>
              <option value="food">Food</option>
              <option value="medical">Medical </option>
              <option value="other">Other</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select category.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              required
              as="select"
              type="select"
              name="urgencyLevel"
              onChange={handleChange}
              value={donationReqData.urgencyLevel}
            >
              <option value="">Select Urgency Level</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select Urgency level.
            </Form.Control.Feedback>
          </Form.Group>
        </div>

        <Form.Group className="mt-3">
          <Form.Control
            placeholder="More details about this request"
            value={donationReqData.description}
            name="description"
            onChange={handleChange}
            as="textarea"
            rows={2}
            minLength={30}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide more details about this request so we can assist you.{" "}
            <br />
            Minimum 30 characters are required.
          </Form.Control.Feedback>
        </Form.Group>
        <div className="signup-form-flex-div">
          <Button id="user-signup-btn" className="mt-5" type="submit">
            Request
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default OrphanageRequestForm;
