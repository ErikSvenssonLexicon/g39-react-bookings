import { createSlice } from "@reduxjs/toolkit";

const premisesListSlice = createSlice({
  name: "premisesList",
  initialState: {
    premisesList: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setPremiesList(state, action) {
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

export const { setPremiesList, setIsLoading, setError } =
  premisesListSlice.actions;

export default premisesListSlice.reducer;
