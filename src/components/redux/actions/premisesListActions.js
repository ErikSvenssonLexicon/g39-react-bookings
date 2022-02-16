import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  setPremisesList,
  setError,
  setIsLoading,
} from "../reducers/premisesListSlice";

import { findAllPremises } from "../../api/apiService";

const PREMISES_LIST = "premisesList"


export const findAllPremisesAction = createAsyncThunk(  
  `${PREMISES_LIST}/findAllPremises`,
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