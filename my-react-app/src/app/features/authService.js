import axios from "axios";
const API_URL = "http://localhost:5000/api/users/";

const register = async (user) => {
  const { username, email, pass } = user;
  const response = await axios.post(API_URL, {
    name: username,
    email,
    password: pass,
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const login = async (user) => {
  const { email, pass } = user;
  console.log(email, pass);
  const response = await axios.post(API_URL + "login", {
    email,
    password: pass,
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const logout = async (user) => {
  localStorage.removeItem(`user`);
};
const authService = { register, logout, login };
export default authService;
