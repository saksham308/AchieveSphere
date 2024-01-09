import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";
const initialState = {
  goals: [],
  isSuccess: false,
  isLoading: false,
  message: "",
  isError: false,
};
export const CreateGoal = createAsyncThunk(
  "goal/create",
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(token);
      return goalService.createGoal(goalData, token);
    } catch (err) {
      const message =
        err.message ||
        err.toString() ||
        (err.response && err.response.data && err.response.data.message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteGoals = createAsyncThunk(
  "goal/deleteGoal",
  async (goalId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return goalService.deleteGoal(goalId, token);
    } catch (err) {
      const message =
        err.message ||
        err.toString() ||
        (err.response && err.response.data && err.response.data.message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getGoals = createAsyncThunk("goal/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return goalService.getGoals(token);
  } catch (err) {
    const message =
      err.message ||
      err.toString() ||
      (err.response && err.response.data && err.response.data.message);
    return thunkAPI.rejectWithValue(message);
  }
});
export const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateGoal.fulfilled, (state, action) => {
        state.goals.push(action.payload);
        (state.isLoading = false), (state.isSuccess = true);
      })
      .addCase(CreateGoal.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.goals = action.payload;
        (state.isLoading = false), (state.isSuccess = true);
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoals.fulfilled, (state, action) => {
        (state.isLoading = false), (state.isSuccess = true);
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        );
      })
      .addCase(deleteGoals.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});
export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
