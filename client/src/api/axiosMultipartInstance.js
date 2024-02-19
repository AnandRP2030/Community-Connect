import axios from "axios";

const axiosMultipartInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL || "http://localhost:5000/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
export default axiosMultipartInstance;
