import React from "react";
import { CiLogin } from "react-icons/ci";
import { Link } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import { logout, reset } from "../app/features/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <header style={{ display: "flex", justifyContent: "space-between" }}>
      <Link to={"/"}>Goal Setter</Link>
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <div>
          <Link to="/login">
            <CiLogin />
            Login
          </Link>
          <Link to="/register">
            <RiAccountCircleFill />
            Register
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
