import React from "react";
import { Container } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./userFooter.css";
export default function UserFooter () {
  return (
    <>
      <div className="user-footer-container">
        <div>
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
        </div>

        <div className="user-footer-msg-div">
          <p> Thank you for visiting this page.</p>
        </div>
      </div>
    </>
  );
}
