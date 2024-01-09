import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import goalReducer from "./features/goalsSlice";
export const store = configureStore({
  reducer: { auth: authReducer, goals: goalReducer },
});
