import { configureStore } from "@reduxjs/toolkit";
import premisesListSlice from "./reducers/premisesListSlice";
import httpRequestSlice from "./reducers/httpRequestSlice";

const store = configureStore({
  reducer: {
    premisesListState: premisesListSlice,
    httpRequestState: httpRequestSlice
  },
});

export default store;
