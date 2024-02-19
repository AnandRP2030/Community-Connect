import { useContext, useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../Context/authContext";
import { CgProfile } from "react-icons/cg";
import LoginModal from "../../Common/LoginModal/loginModal";
import "./orphanageNavbar.css";

const OrphanageNavbar = () => {
  const { logoutUserContext, userContext, loginUserContext } =
    useContext(AuthContext);
  const [loginModalShow, setLoginModalShow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const orpData = JSON.parse(localStorage.getItem("orphanage-data")) || null;
    if (orpData) {
      loginUserContext("orphanage", orpData);
    }
  }, []);

  const redirectUserLogin = () => {
    navigate("/user/login");
  };

  const navigateHome = () => {
    navigate("/orphanage");
  };

  const handleLogout = () => {
    if (localStorage.getItem("user-data")) {
      localStorage.removeItem("user-data");
    }
    if (localStorage.getItem("orphanage-data")) {
      localStorage.removeItem("orphanage-data");
    }
    if (localStorage.getItem("organization-data")) {
      localStorage.removeItem("organization-data");
    }

    logoutUserContext();
    navigate("/user/login");
  };

  const handleRedirectOrpList = () => {
    if (userContext && userContext.userType) {
      navigate("/orphanage/orphanages-list");
    } else {
      setLoginModalShow(true);
    }
  };
  const handleRedirectRequest = () => {
    if (userContext && userContext.userType) {
      navigate("/orphanage/donation-request");
    } else {
      setLoginModalShow(true);
    }
  };
  const redirectProfile = () => {
    if (userContext && userContext.userType === "orphanage") {
      navigate("/orphanage/profile");
    } else {
      setLoginModalShow(true);
    }
  };
  return (
    <>
      <Container fluid className="user-navbar-container">
        <div
          className="user-navbar-left"
          onClick={() => {
            navigate("/orphanage");
          }}
        >
          <p style={{ cursor: "pointer" }} onClick={navigateHome}>
            {" "}
            COMMUNITY CONNECT
          </p>
        </div>
        <div className="user-navbar-center">
          <Link to="/orphanage">Home</Link>
          <button
            className="border-0 text-light bg-transparent"
            onClick={handleRedirectOrpList}
          >
            Orphanages
          </button>
          <button
            className="border-0 text-light bg-transparent"
            onClick={handleRedirectRequest}
          >
            Request
          </button>
        </div>
        <div className="user-navbar-right">
          {/* <img src="https://picsum.photos/200/300" alt="profile-icon" /> */}
          {userContext?.userType ? (
            <button onClick={redirectProfile}>
              {" "}
              <CgProfile /> Profile{" "}
            </button>
          ) : (
            <button onClick={redirectUserLogin}>Login</button>
          )}
        </div>
      </Container>
      <LoginModal
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
      />
    </>
  );
};
export default OrphanageNavbar;
