import AdminNavbar from "../../../Components/Admin/AdminNavbar/adminNavbar";
import AdminLoginForm from "../../../Components/Admin/AdminLoginForm/adminLoginForm";
import AdminFooter from "../../../Components/Admin/AdminFooter/adminFooter.jsx";
import "./AdminLogin.css";
const AdminLogin = () => {
  return (
    <div className="admin-login-container">
      <AdminNavbar />
      <AdminLoginForm/>
      <AdminFooter />
    </div>
  );
};

export default AdminLogin;
