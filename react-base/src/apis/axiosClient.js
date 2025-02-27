import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://filmgo.io.vn/api", // Sửa baseUrl thành baseURL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
