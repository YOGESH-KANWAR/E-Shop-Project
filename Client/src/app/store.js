import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "../features/slice.js";

export const store = configureStore({
  reducer: {
    TodoReducer,
  },
});
