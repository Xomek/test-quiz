import { configureStore } from "@reduxjs/toolkit";
import {  saveState } from "../utils/localStorage";
import testReducer from "./testSlice";

const store = configureStore({
  reducer: {
    test: testReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(() => (next) => (action) => {
      const result = next(action);
      saveState(store.getState().test);
      return result;
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
