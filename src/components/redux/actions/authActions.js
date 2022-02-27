import {createAsyncThunk} from "@reduxjs/toolkit";
import {setPatient, setIsLoggedIn, setError, setIsLoading, setToken} from "../reducers/authSlice";
import {login, findPatientById} from "../../api/apiService";
import jwtDecode from "jwt-decode";

const AUTH = "auth";

export const loginAction = createAsyncThunk(
    `${AUTH}/login`,
    async ({loginCommand}, {dispatch}) => {
        try{
            dispatch(setIsLoading(true));
            const response = await login(loginCommand);
            const token = response["accessToken"];
            const userDetails = jwtDecode(token);
            dispatch(setToken({token: token, userDetails: userDetails}))
            localStorage.setItem("booking_user", token);
            if(userDetails["patientId"]){
                try{
                    const patient = await findPatientById(userDetails["patientId"]);
                    dispatch(setPatient(patient));
                }catch (err){
                    console.log(err);
                }
            }
            dispatch(setIsLoggedIn(true));

        }catch (err){
            dispatch(setError(err));
        }finally {
            dispatch(setIsLoading(false));
        }
    }
)
