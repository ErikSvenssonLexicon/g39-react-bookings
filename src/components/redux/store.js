import { configureStore } from "@reduxjs/toolkit";
import premisesListSlice from "./reducers/premisesListSlice";
import httpRequestSlice from "./reducers/httpRequestSlice";
import authSlice from "./reducers/authSlice";

const store = configureStore({
  reducer: {
    premisesListState: premisesListSlice,
    httpRequestState: httpRequestSlice,
    authState: authSlice
  },
});

export default store;
