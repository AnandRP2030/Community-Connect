import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import orpImg from "../../../Assets/Images/orp-teady-bear.png";
import { useNavigate } from "react-router-dom";
import "./userDonationRequest.css";
const DonationCardContainer = ({ allAcceptedReqs }) => {
  const navigate = useNavigate();
  
  return (
    <Container fluid className="my-5">
      <h1 className="text-center text-dark">All Donation Requests</h1>

      <Container className="d-flex flex-wrap  gap-5 py-3">
        {allAcceptedReqs.map((req) => {
          return (
            <Card
              key={req._id}
              className="shadow rounded pb-4 hover-shadow"
              onClick={() => {
                navigate(req._id);
              }}
              style={{ width: "18rem", cursor: "pointer" }}
            >
              <Card.Img className="hover-overlay hover-zoom hover-shadow" variant="top" src={orpImg} />
              <Card.Body className="h-50">
                <Card.Title className="text-primary font-weight-bold">
                  {req?.title}
                  <br />
                  <span className="text-secondary">
                    <small className="font-italic">
                      ({req.orphanageId?.name.slice(0, 25) || "Orphnage"})
                    </small>
                  </span>
                </Card.Title>
                <Card.Text className="h-50 mb-0">
                  {req.description.slice(0, 100) + "..." || "Description"}
                </Card.Text>
                <Stack
                  direction="horizontal"
                  className="justify-content-between flex-wrap mt-2"
                >
                  {/* stop btn propagation here  */}
                  <Button variant="success">Donate</Button>
                  <Button variant="primary">Contact</Button>
                </Stack>
              </Card.Body>
            </Card>
          );
        })}
      </Container>
    </Container>
  );
};
export default DonationCardContainer;
