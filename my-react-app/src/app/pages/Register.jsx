// Register.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, register } from "../features/authSlice";
import { toast } from "react-toastify";
const Register = ({ onRegisterSubmit }) => {
  const { user, isError, isLoading, message, isSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [signupFormData, setSignupFormData] = useState({
    username: "",
    email: "",
    pass: "",
    pass2: "",
  });
  const { username, email, pass, pass2 } = signupFormData;
  const navigate = useNavigate();
  const handleSignupChange = (e) => {
    setSignupFormData({
      ...signupFormData,
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

  const handleRegisterSubmitLocal = (e) => {
    e.preventDefault();
    if (pass !== pass2) {
      toast.error("passwords do not match");
    } else {
      const userData = { username, email, pass };
      dispatch(register(userData));
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleRegisterSubmitLocal}>
          <label>
            <input
              placeholder="Username"
              type="text"
              name="username"
              value={username}
              onChange={handleSignupChange}
            />
          </label>
          <br />
          <label>
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={email}
              onChange={handleSignupChange}
            />
          </label>
          <br />
          <label>
            <input
              placeholder="Password"
              type="password"
              name="pass"
              value={pass}
              onChange={handleSignupChange}
            />
          </label>
          <label>
            <input
              placeholder="Confirm Password"
              type="pass2"
              name="pass2"
              value={pass2}
              onChange={handleSignupChange}
            />
          </label>
          <br />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
