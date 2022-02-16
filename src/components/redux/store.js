import { configureStore } from "@reduxjs/toolkit";
import premisesListSlice from "./reducers/premisesListSlice";

const store = configureStore({
  reducer: {
    premisesList: premisesListSlice
  },
});

export default store;
