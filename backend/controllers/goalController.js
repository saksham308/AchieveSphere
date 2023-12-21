const asyncHandler = require("express-async-handler");
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get goals" });
});

const setGoals = asyncHandler(async (req, res) => {
  console.log(req.body);
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text field");
  } else {
    res.status(200).json({ message: "post goals" });
  }
});

const putGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `update goal ${req.params.id}` });
});

const deleteGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `delete goal ${req.params.id}` });
});
module.exports = { getGoals, setGoals, deleteGoals, putGoals };
