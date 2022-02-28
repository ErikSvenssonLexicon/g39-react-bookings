import {createAsyncThunk} from "@reduxjs/toolkit";
import {setPremisesList, setIsLoading, setError, replacePremises} from "../reducers/premisesListSlice";
import {findAllPremises, findPremisesById} from "../../api/apiService";

const PREMISES_LIST = "premisesList"


export const findAllPremisesAction = createAsyncThunk(  
  `${PREMISES_LIST}/findAllPremises`,
  async (payload,thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const response = await findAllPremises();
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

export const findPremisesByIdAction = createAsyncThunk(
    `${PREMISES_LIST}/findPremisesById`,
    async (id, thunkApi) =>{
        try{
            thunkApi.dispatch(setIsLoading(true));
            const response = await findPremisesById(id);
            if(response.status){
                thunkApi.dispatch(setError(response));
            }else{
                thunkApi.dispatch(replacePremises(response));
            }

        }catch (err){
            console.log(err);

        }finally {
            thunkApi.dispatch(setIsLoading(false));
        }
    }
)

