import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPatientData} from "../redux/actions/authActions";
import jwtDecode from "jwt-decode";
import {setToken} from "../redux/reducers/authSlice";


const PatientLanding = props => {
    const dispatch = useDispatch();
    const {patient, userDetails} = useSelector(state => state.authState)




    useEffect(() => {
        if(!patient){
            let id = null
            if(userDetails && userDetails.patientId){
                id = userDetails.patientId;
            }else{
                const token = localStorage.getItem("booking_user");
                const decodedToken = jwtDecode(token);
                dispatch(setToken({token: token, userDetails: decodedToken}));
                id = decodedToken.patientId;
            }
            dispatch(fetchPatientData(id))
        }

    },[dispatch,patient, userDetails])

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center ">
            <div className="col col-md-8 col-sm-12">
                <div className="card shadow">
                    <div className="card-header">
                        <div className="nav d-flex justify-content-between align-items-center text-center">
                            <h4 className="m-0">Nisse Nilsson</h4>
                            <form>
                                <button className="btn btn-success btn-large" type="submit">Logga Ut</button>
                            </form>
                        </div>
                    </div>
                    <div className="card-body">
                        <h4 className="card-subtitle">Patient:</h4>
                        <div className="row">
                            <span>Namn: Nisse Nilsson</span>
                        </div>
                        <div className="row">
                            <span>PNR: 197609112456</span>
                        </div>
                        <div className="row">
                            <span>F??delesedatum: 19760911</span>
                        </div>
                        <hr />
                            <h4 className="card-subtitle">Kontakt:</h4>
                            <div className="row">
                                <span>Email: nisse@gmail.com</span>
                            </div>
                            <div className="row">
                                <span>Telefon: 0702347642</span>
                            </div>

                    </div>
                    <div className="card-footer">
                        <ul className="row nav nav-pills card-header-pills row-cols-1 row-cols-md-3 row-cols-lg-5">
                            <li className="col nav-item">
                                <a className="nav-link active text-center">Hem</a>
                            </li>
                            <li className="col nav-item">
                                <a className="nav-link text-center">Uppdatera</a>
                            </li>
                            <li className="col nav-item">
                                <a className="nav-link text-center">Anv??ndare</a>
                            </li>
                            <li className="col nav-item">
                                <a className="nav-link text-center">Bokningar</a>
                            </li>
                            <li className="col nav-item">
                                <a className="nav-link text-center">S??k tider</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientLanding;