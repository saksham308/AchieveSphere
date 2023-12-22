const asyncHandler = require("express-async-handler");
const Goal = require("../models/goals.model");
const User = require("../models/users.model");
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text field");
  } else {
    const goal = await Goal.create({
      user: req.user.id,
      text: req.body.text,
    });
    res.status(200).json(goal);
  }
});

const putGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("goal not found");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (goal.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("User not authorized");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("goal not found");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (goal.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("User not authorized");
  }
  const deletedGoal = await Goal.deleteOne({ _id: req.params.id });
  res.status(200).json({ id: `${req.params.id}` });
});
module.exports = { getGoals, setGoals, deleteGoals, putGoals };
