import { configureStore } from "@reduxjs/toolkit";
import premisesListSlice from "./reducers/premisesListSlice";

const store = configureStore({
  reducer: {
    premisesListState: premisesListSlice
  },
});

export default store;
