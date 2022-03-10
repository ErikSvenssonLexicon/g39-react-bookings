import {useEffect, useState, useRef, Fragment} from "react";
import {useParams, useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {findPremisesByIdAction} from "../redux/actions/premisesListActions";
import {Modal} from "bootstrap";
import {deleteBooking} from "../api/apiService";
import Table from "../layout/Table";
import BookingForm from "../bookings/BookingForm";
import {PremisesUpdateForm} from "./PremisesUpdateForm";
import {replacePremises} from "../redux/reducers/premisesListSlice";
import ModalDisplay from "../layout/ModalDisplay";

const Premises = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {isLoading, premisesList, error} = useSelector((state) => state.premisesListState)
    const params = useParams();
    const id = params.id;
    if(!id){
        history.goBack();
    }
    let _premises = premisesList.find(element => element.id === id)

    const [bookingForm, setBookingForm] = useState(null);
    const [updateForm, setUpdateForm] = useState(null);
    const bookingFormRef = useRef();
    const updateFormRef = useRef();
    const removeId = useRef(null);

    const [premises, setPremises] = useState(premisesList.find(element => element.id === id));
    const [isRemove, setIsRemove] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);



    useEffect(() => {
        if(!isInitialized){
            if(premises){
                setBookingForm(new Modal(bookingFormRef.current));
                setUpdateForm(new Modal(updateFormRef.current));
            }
        }
        return () => setIsInitialized(true);
    }, [isInitialized, premises])

    useEffect(() => {
        if (_premises && _premises.bookings) {
            setPremises(_premises);
        } else {
            dispatch(findPremisesByIdAction(id));
        }
    }, [id, dispatch, _premises]);

    useEffect(() => {
        if (isRemove) {
            deleteBooking(removeId.current).then((response) => {
                if (response.status && response.status === 204) {
                    setPremises((oldState) => {
                        console.log(oldState);
                        return {
                            ...oldState,
                            bookings: oldState.bookings.filter(
                                (booking) => booking.id !== removeId.current
                            ),
                        };
                    });
                } else {
                    console.log(response);
                }
            });
        }
        return () => {
            setIsRemove(false);
        };
    }, [isRemove]);

    const handleRemoveBooking = (id) => {
        removeId.current = id;
        setIsRemove(true);
    };

    const handleAddBooking = (updatedPremises) => {
        dispatch(replacePremises(updatedPremises));
        setPremises(updatedPremises);
    };

    const handleSetUpdatedPremises = (updatedPremises) => {
        dispatch(replacePremises(updatedPremises))
        setPremises(updatedPremises);
    }

    let table = null;
    if (premises && premises.bookings && premises.bookings.length > 0) {
        const headJsx = (
            <tr key="bookings-columns">
                <th scope="col">Tid</th>
                <th scope="col">Pris</th>
                <th scope="col">Vaccin</th>
                <th scope="col">Åtgärder</th>
            </tr>
        );

        const bodyJsx = premises.bookings.map((booking) => {
            return (
                <tr className="align-middle" id={booking.id} key={booking.id}>
                    <td>{booking.dateTime.replace("T", " ")}</td>
                    <td>{`${booking.price} SEK`}</td>
                    <td>{booking.vaccineType}</td>
                    <td>
                        <div className="d-flex">
                            <button className="btn btn-info text-white me-2">Visa</button>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleRemoveBooking(booking.id)}
                            >
                                Ta bort
                            </button>
                        </div>
                    </td>
                </tr>
            );
        });

        table = <Table className="table-hover" thead={headJsx} tbody={bodyJsx}/>;
    }


    return (
        <div className="card mt-5">
            <div className="card-header">
                <div className="nav d-flex justify-content-between align-items-center text-center">
                    <div className="d-flex gap-2">
                        <button className="btn btn-primary" disabled={error} onClick={() => updateForm.show()}>
                            Uppdatera
                        </button>
                    </div>
                </div>
            </div>
            <div className="card-body">
                {!isLoading && premises &&
                <Fragment>
                    <ModalDisplay ref={bookingFormRef} title="Ny bokning:" modal={bookingForm}>
                        <BookingForm premisesId={id} handleAddBooking={handleAddBooking}/>
                    </ModalDisplay>
                    <PremisesUpdateForm
                        ref={updateFormRef}
                        modal={updateForm}
                        _premises={premises}
                        handleSetUpdatedPremises={handleSetUpdatedPremises}
                    />

                    <h5 className="card-title mb-2">{`Lokal: ${premises.name}`}</h5>
                    <hr/>
                    <h5 className="card-subtitle mb-2">Adress:</h5>
                    <p>
                        <span>{`${premises.address.streetAddress}, ${premises.address.zipCode}, ${premises.address.city}`}</span>
                    </p>
                    <hr/>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-subtitle">Upplagda tider:</h5>
                        <button
                            onClick={() => bookingForm.show()}
                            className="btn btn-success"
                        >
                            Skapa bokning
                        </button>
                    </div>
                    {table ? (
                        table
                    ) : (
                        <p className="text-center">Finns inga bokningar</p>
                    )}
                </Fragment>
                }
                {error && <p className="text-center text-danger">{error.message}</p>}
            </div>
        </div>
    );
};

export default Premises;
