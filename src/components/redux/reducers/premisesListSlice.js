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
    addPremises(state, action) {
      return {
        ...state,
        premisesList: [...state.premisesList, action.payload],
      };
    },
    replacePremises(state, action) {
      const premises = action.payload;
      const _premisesList = [...state.premisesList];
      const index = _premisesList.findIndex(
        (element) => element.id === premises.id
      );
      if (index < 0) {
        return state;
      } else {
        _premisesList[index] = premises;
        return {
          ...state,
          premisesList: _premisesList,
        };
      }
    },
    removePremises(state, action) {
      return {
        ...state,
        premisesList: state.premisesList.filter(
          (premises) => premises.id !== action.payload
        ),
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

export const {
  setPremisesList,
  addPremises,
  removePremises,
  setIsLoading,
  setError,
  replacePremises,
} = premisesListSlice.actions;

export default premisesListSlice.reducer;
