import React from "react";
import { useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { deleteGoals } from "../app/features/goalsSlice";
const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <div style={{ display: "flex", gap: "4px" }}>
        <h2>{goal.text}</h2>
        <button
          style={{ alignSelf: "center" }}
          onClick={() => dispatch(deleteGoals(goal._id))}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default GoalItem;
