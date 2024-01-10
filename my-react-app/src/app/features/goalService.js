import axios from "axios";
const API_URL = "http://localhost:5000/api/goals/";
const createGoal = async (goalData, token) => {
  // console.log(token, goalData);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, goalData, config);

  return response.data;
};
const updateGoal = async (goalData, token) => {
  const { id, text } = goalData;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + id, { text: text }, config);
  console.log(response);
  return response.data;
};
const deleteGoal = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + id, config);
  return response.data;
};
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};
const goalService = { createGoal, getGoals, deleteGoal, updateGoal };

export default goalService;
