import React, {useReducer, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {resetState} from "../redux/reducers/httpRequestSlice";
import {addNewBookingAction} from "../redux/actions/formActions";
import FloatingFormGroup from "../layout/FloatingFormGroup";
import FloatingInput from "../layout/FloatingInput";
import Spinner from "../layout/Spinner";


const bookingInitialState = {
        id: null,
        dateTime: "",
        price: "",
        administratorId: "",
        vaccineType: "",
        vacant: true
}

const bookingFormReducer = (state, action) => {
    switch (action.type){
        case "SET_VACCINE_TYPE":
            return {
                ...state,
                vaccineType: action.payload
            }
        case "SET_DATE_TIME":
            return {
                ...state,
                dateTime: action.payload
            }
        case "SET_PRICE":
            return {
                ...state,
                price: action.payload
            }
        case "SET_VACANT":
            return {
                ...state,
                vacant: action.payload
            }
        case "SET_ADMINISTRATOR_ID":
            return {
                ...state,
                administratorId: action.payload
            }
        case "SET_BOOKING":
            return action.payload ? action.payload : bookingInitialState
        default:
            return state;
    }

}


const BookingForm = ({handleAddBooking, premisesId, closeModal, method, _booking}) => {
    let initialState = _booking ? _booking : bookingInitialState
    const dispatch = useDispatch();
    const {isLoading, error, fieldErrors, object} = useSelector(
        (state) => state.httpRequestState
    );

    const[booking, bookingDispatch] = useReducer(bookingFormReducer, initialState);

    useEffect(() => {
        dispatch(resetState())
    }, [dispatch])

    useEffect(() => {
        if(object != null){
            handleAddBooking(object);
            dispatch(resetState());
            bookingDispatch({type: "SET_BOOKING", payload: initialState})
            closeModal();
        }

    },[object, dispatch, handleAddBooking, closeModal, initialState])


    const handleSubmit = (e) => {
        e.preventDefault();
        if(method === "post"){
            dispatch(addNewBookingAction({booking: booking, premisesId: premisesId}))
        }

    };

    const handleReset = (e) => {
        e.preventDefault();
        bookingDispatch({type: "SET_BOOKING", payload: initialState})
        dispatch(resetState())
    };

    const handleCheckboxEvent = (e) => {
        const vacant = !!e.target.checked;
        bookingDispatch({type: "SET_VACANT", payload: vacant})
    }

    return (
        <React.Fragment>
            {isLoading && <Spinner />}
            {error && <p className="text-center text-danger">{error}</p>}
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <FloatingFormGroup className="mb-2">
                    <FloatingInput
                        label="Vaccin:" field="vaccineType" fieldErrors={fieldErrors} input={{
                        id: "vaccine", type: "text", value: booking.vaccineType, onChange: (e) => bookingDispatch({type: "SET_VACCINE_TYPE", payload: e.target.value})
                    }}
                    />
                </FloatingFormGroup>

                <div className="row g-2 mb-2">
                    <FloatingFormGroup className="col-md">
                        <FloatingInput
                            label="Datum och tid:" field="dateTime" fieldErrors={fieldErrors} input={{
                            id: "dateTime",
                            type: "datetime-local",
                            value: booking.dateTime,
                            onChange: (e) => bookingDispatch({type: "SET_DATE_TIME", payload: e.target.value})
                        }}
                        />
                    </FloatingFormGroup>
                    <FloatingFormGroup className="col-md">
                        <FloatingInput
                            label="price" field="price" fieldErrors={fieldErrors} input={{
                            id: "price",
                            type: "number",
                            min: "0",
                            step: "0.1",
                            value: booking.price,
                            onChange: (e) => bookingDispatch({type: "SET_PRICE", payload: e.target.value})
                        }}
                        />
                    </FloatingFormGroup>
                </div>
                {method && method === "put" &&
                <FloatingFormGroup className="mb-2">
                    <FloatingInput
                        label="Vaccin administratör:" field="administratorId" fieldErrors={fieldErrors} input={{
                        id: "administratorId",
                        type: "text",
                        value: booking.administratorId,
                        onChange: (e) => bookingDispatch({type: "SET_ADMINISTRATOR_ID", payload: e.target.value})
                    }}
                    />
                </FloatingFormGroup>}
                {method && method === "put" &&
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="vacant" checked={booking.vacant} onChange={handleCheckboxEvent}/>
                    <label className="form-check-label" htmlFor="vacant">
                        Tillgänglig:
                    </label>
                </div>}
                <div className="d-grid g-2 gap-2">
                    <button type="submit" className="btn btn-success">
                        Skapa
                    </button>
                    <button type="reset" className="btn btn-danger">
                        Rensa
                    </button>
                </div>
            </form>
        </React.Fragment>
    );
}


export default BookingForm;
