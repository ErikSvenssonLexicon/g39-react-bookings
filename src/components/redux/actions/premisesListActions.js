import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  setPremisesList,
  setError,
  setIsLoading,
} from "../reducers/premisesListSlice";

import { findAllPremises } from "../../api/apiService";


export const findAllPremisesAction = createAsyncThunk(  
  "premisesList/findAllPremises",
  async (payload,thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const response = await findAllPremises();
      console.log(response)
      if (response.status) {
        thunkAPI.dispatch(setError(response));
      } else {
        thunkAPI.dispatch(setPremisesList(response));
      }
    }catch(err){
      console.log(err)
    } finally {
      thunkAPI.dispatch(setIsLoading(false));
    }
  }
);
