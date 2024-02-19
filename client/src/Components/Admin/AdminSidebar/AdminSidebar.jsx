import { FcBinoculars } from "react-icons/fc";
import { FcVoicePresentation } from "react-icons/fc";
import { FcHome } from "react-icons/fc";
import { FcCollaboration } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { FcInTransit } from "react-icons/fc";
import { FcServices } from "react-icons/fc";
import { FcOrganization } from "react-icons/fc";
import { FcImport } from "react-icons/fc";
import "./AdminSidebar.css";

const AdminSidebar = ({ activePage, changeActivePage }) => {
  return (
    <div className="admin-sidebar-container">
      <div className="sidebar-heading">
        <FcBusinessman />
        <h5> Administration</h5>
      </div>
      <hr className="admin-sidebar-hr" />

      <div className="admin-sidebar-links">
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("overview")}
        >
          <FcBinoculars />
          <h5>Overview</h5>
        </div>
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("users")}
        >
          <FcVoicePresentation />
          <h5>Users</h5>
        </div>
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("orphanages")}
        >
          <FcHome />
          <h5>Orphanages</h5>
        </div>
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("organizations")}
        >
          <FcOrganization />
          <h5>Organizations</h5>
        </div>
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("donation-requests")}
        >
          <FcImport />
          <h5>Donation Requests</h5>
        </div>
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("donations")}
        >
          <FcInTransit />
          <h5>Donations</h5>
        </div>
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("events")}
        >
          <FcCollaboration />
          <h5>Events</h5>
        </div>
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("settings")}
        >
          <FcServices />
          <h5>Settings</h5>
        </div>
      </div>
    </div>
  );
};
export default AdminSidebar;
