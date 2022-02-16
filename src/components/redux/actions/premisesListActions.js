import { createAsyncThunk } from "@reduxjs/toolkit";
import {setPremisesList, setError, setIsLoading, addPremises} from "../reducers/premisesListSlice";
import { findAllPremises, postPremises } from "../../api/apiService";

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

export const addNewPremisesAction = createAsyncThunk(
    `${PREMISES_LIST}/postPremises`,
    async (premises, {dispatch}) =>{
        try{
            dispatch(setIsLoading(true))
            const response = await postPremises(premises)
            if(response.status >= 400){
                console.log(response)
                dispatch(setError(response))
            }else{
                dispatch(addPremises(response))
            }
        }catch (err){
            console.log(err)
        }finally {
            dispatch(setIsLoading(false))
        }
    }
)
