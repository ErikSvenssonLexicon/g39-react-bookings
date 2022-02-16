import { configureStore } from "@reduxjs/toolkit";
import premisesListSlice from "./reducers/premisesListSlice";

const store = configureStore({
  reducer: {
    premisesListSlice: premisesListSlice
  },
});

export default store;
