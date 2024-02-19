import { useState, useEffect } from "react";
import axiosInstance from "../../../api/BaseUrl";
import BarChart from "../../Charts/BarChart/barChart";
import PieChart from "../../Charts/PieChart/pieChart";
import LineChart from "../../Charts/LineChart/lineChart";
import "./adminOverview.css";
const AdminOverview = () => {
  const [usersData, setUsersData] = useState([]);
  const [orgData, setOrgData] = useState([]);
  const [orpData, setOrpData] = useState([]);

  const [allUsersDataLength, setAllUsersDataLength] = useState([0, 0, 0]);
  const [donationReqCount, setDonationReqCount] = useState([0, 0]); // [pending, fullfilled]
  const [dataSet, setDataSet] = useState({
    labels: ["Users", "Orphanages", "Organizations"],
    datasets: [
      {
        label: "Total Users",
        data: allUsersDataLength,
      },
    ],
    backgroundColor: ["red", "green", "blue"],
  });
  const [donationDataSet, setDonationDataSet] = useState({
    labels: ["pending", "fullfilled"],
    datasets: [
      {
        label: "Total Donation Requests",
        data: donationReqCount,
      },
    ],
    backgroundColor: ["red", "green"],
  });

  useEffect(() => {
    getAllUsers();
    getAllOrp();
    getAllOrg();
    getDonationReq();
  }, []);

  useEffect(() => {
    setAllUsersDataLength([usersData.length, orpData.length, orgData.length]);
  }, [usersData, orgData, orpData]);

  // updating chart when alluserdata length change
  useEffect(() => {
    setDataSet({
      labels: ["Users", "Orphanages", "Organizations"],
      datasets: [
        {
          label: "Total Users",
          data: allUsersDataLength,
          backgroundColor: ["#6366f1", "#f79009", "#10b981"],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [allUsersDataLength]);

  // updating donation req chart

  useEffect(() => {
    setDonationDataSet({
      labels: ["pending", "fullfilled"],
      datasets: [
        {
          label: "Total Donation Requests",
          data: donationReqCount,
          backgroundColor: ["#36a2eb", "#ff6384"],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [donationReqCount]);
  // get donation reqs data

  function totalDonationRequests() {
    return donationReqCount[0] + donationReqCount[1];
  }
  function totalUsers() {
    return (
      allUsersDataLength[0] + allUsersDataLength[1] + allUsersDataLength[2]
    );
  }
  const getDonationReq = async () => {
    try {
      const res = await axiosInstance.get("donation-request/get-all-requests");
      const data = res?.data?.data;

      const totalReq = data.length;
      let totalPending = 0;

      data.forEach((elem) => {
        console.log(elem.status === "pending");
        if (elem.status === "pending") {
          totalPending++;
        }
      });
      const totalApproved = totalReq - totalPending;

      setDonationReqCount([totalPending, totalApproved]);
    } catch (error) {
      console.log("error on get all users", error?.message);
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await axiosInstance.get("user/get-all-users");
      const allUsers = res?.data?.data;
      if (allUsers?.length > 0) {
        setUsersData(allUsers);
      }
    } catch (error) {
      console.log("error on get all users", error?.message);
    }
  };
  const getAllOrp = async () => {
    try {
      const res = await axiosInstance.get("orphanage/get-all-orphanages");
      const allOrp = res?.data?.data;
      if (allOrp.length > 0) {
        setOrpData(allOrp);
      }
    } catch (error) {
      console.log("error on get all orp", error?.message);
    }
  };
  const getAllOrg = async () => {
    try {
      const res = await axiosInstance.get("organization/get-all-organizations");
      const allOrg = res?.data?.data;
      if (allOrg.length > 0) {
        setOrgData(allOrg);
      }
    } catch (error) {
      console.log("error on get all org", error?.message);
    }
  };
  return (
    <>
      <h1 className="ml-4"> Admin overview</h1>
      <div className="d-flex gap-5 justify-content-around mt-5">
        <div className="admin-overview-barchart-container w-25">
          <h3> Donation Requests</h3>
          <p>Total Requests {totalDonationRequests()} </p>
          <PieChart chartData={donationDataSet} />
        </div>

        <div className="admin-overview-barchart-container">
          <h3> Total Number of Users</h3>
          <p className="mb-5">Total Users {totalUsers()} </p>
          <BarChart chartData={dataSet} />
        </div>
      </div>
    </>
  );
};
export default AdminOverview;
