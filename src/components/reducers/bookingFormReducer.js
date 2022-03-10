export const bookingInitialState = {
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

export default bookingFormReducer;