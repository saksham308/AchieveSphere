import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { deleteGoals, updateGoals } from "../app/features/goalsSlice";
const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();
  const [selectedGoal, setSelectedGoal] = useState(false);
  const ref = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const textVal = ref.current.value;
    dispatch(updateGoals({ id: goal._id, text: textVal }));
    setSelectedGoal(!selectedGoal);
  };
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
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <button
            style={{ alignSelf: "center" }}
            onClick={() => setSelectedGoal(!selectedGoal)}
          >
            Update
          </button>
          {selectedGoal && (
            <form onSubmit={handleSubmit}>
              {" "}
              <input ref={ref} type="text" />
              <button type="submit">Update Goal</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalItem;
