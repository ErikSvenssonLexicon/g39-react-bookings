
export const initialState = {
    id: null,
    name: "",
    address: {
        streetAddress: "",
        zipCode: "",
        city: ""
    }
}

const premisesReducer = (state, action) => {
    switch (action.type) {
        case "SET_NAME":
            return {
                ...state,
                name: action.payload
            }
        case "SET_STREET_ADDRESS":
            return {
                ...state,
                address: {
                    ...state.address,
                    streetAddress: action.payload
                }
            };
        case "SET_ZIP_CODE":
            return {
                ...state,
                address: {
                    ...state.address,
                    zipCode: action.payload
                }
            }
        case "SET_CITY":
            return {
                ...state,
                address: {
                    ...state.address,
                    city: action.payload
                }
            }
        case "SET_PREMISES":
            return action.payload ? action.payload : initialState;
        default:
            return state;
    }
}

export default premisesReducer;