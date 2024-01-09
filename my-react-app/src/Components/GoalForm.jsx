import React, { useState } from "react";
import { CreateGoal } from "../app/features/goalsSlice";
import { useSelector, useDispatch } from "react-redux";
const GoalForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      return;
    }
    dispatch(CreateGoal({ text }));
    setText("");
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        {" "}
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          type="text"
        />
        <button type="submit">Add Goal</button>
      </form>
    </section>
  );
};

export default GoalForm;
