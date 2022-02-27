import {createSlice} from '@reduxjs/toolkit';


const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        patient: null,
        token: null,
        isLoading: false,
        error: null,
        userDetails: null
    },
    reducers: {
        setIsLoading(state, action){
            return {
                ...state,
                isLoading: action.payload
            }
        },
        setError(state, action){
            return{
                ...state,
                error: action.payload
            }
        },
        setPatient(state, action){
            return{
                ...state,
                patient: action.payload
            }
        },
        setIsLoggedIn(state,action){
            return {
                ...state,
                isLoggedIn: action.payload
            }
        },
        setToken(state, action){
            return {
                ...state,
                token: action.payload.token,
                userDetails: action.payload.userDetails
            }
        }
    }
})

export const {setPatient, setIsLoggedIn, setError, setIsLoading, setToken} = authSlice.actions;
export default authSlice.reducer;