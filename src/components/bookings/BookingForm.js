import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {resetState} from "../redux/reducers/httpRequestSlice";
import {addNewBookingAction} from "../redux/actions/formActions";
import FloatingFormGroup from "../layout/FloatingFormGroup";
import FloatingInput from "../layout/FloatingInput";
import Spinner from "../layout/Spinner";

const BookingForm = ({handleAddBooking, premisesId, closeModal}) => {

    const dispatch = useDispatch();
    const {isLoading, error, fieldErrors, object} = useSelector(
        (state) => state.httpRequestState
    );

    const [booking, setBooking] = useState({
        vaccineType: "",
        dateTime: "",
        price: "",
    });

    useEffect(() => {
        dispatch(resetState())
    }, [dispatch])

    useEffect(() => {
        if(object != null){
            handleAddBooking(object);
            dispatch(resetState());
            setBooking({
                vaccineType: "",
                dateTime: "",
                price: ""
            })
            closeModal();
        }

    },[object, dispatch, handleAddBooking, closeModal])

    const handleVaccineChange = (e) => {
        setBooking((prevState) => {
            return {
                ...prevState,
                vaccineType: e.target.value,
            };
        });
    };

    const handleDateTimeChange = (e) => {
        setBooking((prevState) => {
            return {
                ...prevState,
                dateTime: e.target.value,
            };
        });
    };

    const handlePriceChange = (e) => {
        setBooking((prevState) => {
            return {
                ...prevState,
                price: e.target.value,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addNewBookingAction({booking: booking, premisesId: premisesId}))
    };

    const handleReset = (e) => {
        e.preventDefault();
        setBooking({
            vaccineType: "",
            dateTime: "",
            price: "",
        });
        dispatch(resetState())
    };

    return (
        <React.Fragment>
            {isLoading && <Spinner />}
            {error && <p className="text-center text-danger">{error}</p>}
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <FloatingFormGroup className="mb-2">
                    <FloatingInput
                        label="Vaccin:" field="vaccineType" fieldErrors={fieldErrors} input={{
                        id: "vaccine", type: "text", value: booking.vaccineType, onChange: handleVaccineChange
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
                            onChange: handleDateTimeChange
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
                            onChange: handlePriceChange
                        }}
                        />
                    </FloatingFormGroup>
                </div>
                <div className="d-grid g-2 gap-2">
                    <button type="submit" className="btn btn-success">
                        Skapa
                    </button>
                    <button type="reset" className="btn btn-success">
                        Rensa
                    </button>
                </div>
            </form>
        </React.Fragment>
    );
}


export default BookingForm;
