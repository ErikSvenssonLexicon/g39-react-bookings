import { createSlice } from "@reduxjs/toolkit";

const premisesListSlice = createSlice({
  name: "premisesList",
  initialState: {
    premisesList: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setPremisesList(state, action) {
      return {
        ...state,
        premisesList: action.payload,
      };
    },
    setIsLoading(state, action) {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    setError(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});

export const { setPremisesList, setIsLoading, setError } =
  premisesListSlice.actions;

export default premisesListSlice.reducer;
