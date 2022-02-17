import {createAsyncThunk} from '@reduxjs/toolkit';
import {setIsLoading, setFieldErrors, setError, setObject} from "../reducers/httpRequestSlice";
import {postPremises} from "../../api/apiService";


const HTTP_REQUEST= "httpRequest"

export const addNewPremisesAction = createAsyncThunk(
    `${HTTP_REQUEST}/postPremises`,
    async ({premises},{dispatch}) =>{
        try{
            dispatch(setIsLoading(true))
            const response = await postPremises(premises)
            if(response.status >= 400){

                dispatch(setError(response.message))
                if(response.errors){
                    dispatch(setFieldErrors(response.errors))
                }
            }else{
                dispatch(setObject(response))
            }
        }catch (err){
            console.log(err)
        }finally {
            dispatch(setIsLoading(false))
        }
    }
)