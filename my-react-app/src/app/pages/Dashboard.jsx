import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import GoalForm from "../../Components/GoalForm";
import { getGoals, reset } from "../features/goalsSlice";
import GoalItem from "../../Components/GoalItem";
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isError, isLoading, message, isSuccess } = useSelector(
    (state) => state.goals
  );
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isError) {
      console.log(message);
    }
    dispatch(getGoals());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, message, dispatch, isError]);

  return (
    <>
      <h1>{user && user.name}</h1>
      <h2>Goals Dashboard</h2>
      <GoalForm />
      <section>
        {goals.length > 0 ? (
          <div>
            {goals.map((ele) => (
              <GoalItem key={ele._id} goal={ele} />
            ))}
          </div>
        ) : (
          <h3>Currently you have no goals</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
