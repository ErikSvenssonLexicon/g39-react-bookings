import {createSlice} from "@reduxjs/toolkit";

const httpRequestSlice = createSlice({
    name: "httpRequest",
    initialState: {
        error: null,
        fieldErrors: null,
        isLoading: false,
        object: null,
    },
    reducers: {
        setIsLoading(state, action){
            return{
                ...state,
                isLoading: action.payload
            }
        },
        setError(state, action){
            return {
                ...state,
                error: action.payload
            }
        },
        setFieldErrors(state, action){
            return {
                ...state,
                fieldErrors: action.payload
            }
        },
        setObject(state, action){
            return{
                ...state,
                object: action.payload
            }
        },
        resetState(){
            return {
                error: null,
                fieldErrors: null,
                isLoading: false,
                object: null
            }
        }
    }
})

export const {setIsLoading, setError, setFieldErrors, resetState, setObject} = httpRequestSlice.actions;
export default httpRequestSlice.reducer;