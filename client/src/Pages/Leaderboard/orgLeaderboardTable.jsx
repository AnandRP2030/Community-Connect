import { Button, Table } from "react-bootstrap";
const OrgLeaderBoardTable = ({ orgData }) => {
  console.log("org data", orgData);

  let sortedByDonatedAmt = [...orgData].sort(
    (a, b) => b.totalDonatedAmt - a.totalDonatedAmt
  );

  console.log("sort", sortedByDonatedAmt);

  if (sortedByDonatedAmt.length === 0) {
    return (
      <div>
        <h3 className="text-center"> No data found</h3>
      </div>
    );
  }

  return (
    <div className="px-5">
      <Table className="mx-auto mt-5" striped bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Organization Name</th>
            <th>Owner</th>
            <th>Donated amount</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {sortedByDonatedAmt.map((org, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{org.name}</td>
                <td>{org.ownerName}</td>
                <td>{org.totalDonatedAmt}</td>
                <td>{org.address}</td>
                <td>{org.phoneNumber}</td>
                <td>{org.email}</td>
                <td>
                  <Button> View </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default OrgLeaderBoardTable;
