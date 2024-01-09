// Login.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, login } from "../features/authSlice";
import { toast } from "react-toastify";
import "./Login.css";
const Login = ({ onLoginSubmit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isLoading, message, isSuccess } = useSelector(
    (state) => state.auth
  );
  const [loginFormData, setLoginFormData] = useState({
    loginEmail: "",
    loginPassword: "",
  });
  const { loginEmail, loginPassword } = loginFormData;
  const handleLoginChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, dispatch, isError, isSuccess, message, navigate]);

  const handleLoginSubmitLocal = (e) => {
    e.preventDefault();
    dispatch(login({ email: loginEmail, pass: loginPassword }));
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmitLocal}>
          <label>
            Email:
            <input
              type="email"
              name="loginEmail"
              value={loginEmail}
              onChange={handleLoginChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="loginPassword"
              value={loginPassword}
              onChange={handleLoginChange}
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
