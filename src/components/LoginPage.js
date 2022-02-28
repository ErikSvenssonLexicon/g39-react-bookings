import {useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginAction} from "./redux/actions/authActions";
import  {useHistory} from "react-router-dom";
import Spinner from "./layout/Spinner";


const LoginPage = props => {

    const dispatch = useDispatch();
    const {isLoading, error, isLoggedIn, userDetails} = useSelector(state => state.authState);
    const history = useHistory();
    const userNameRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        if(isLoggedIn && userDetails){
            if(userDetails["authorities"].includes("ADMIN")){
                history.push("/premises")
            }else {
                history.push("/patient-landing")
            }
        }
    }, [isLoggedIn, userDetails, history])


    const onSubmitHandler = (e) => {
        e.preventDefault();
        const loginCommand = {
            username: userNameRef.current.value,
            password: passwordRef.current.value,
        }

        dispatch(loginAction({loginCommand}));
    }


    return (
        <div className="d-flex min-vh-100 justify-content-center align-items-center">
            {isLoading && <div className="card"><Spinner/></div>}
            {!isLoading && <div className="col-8">
                <div className="card">
                    <div className="card-header">
                        <div className="nav d-flex justify-content-end">
                            <Link to="/index" className="btn btn-primary btn-large">Avbryt</Link>
                        </div>
                    </div>
                    <div className="card-body shadow-sm">
                        {error && <p className="text-center text-danger">Felaktigt användarnamn eller lösenord</p>}
                        <h4 className="card-title">Du behöver logga in</h4>
                        <form onSubmit={onSubmitHandler}>
                            <div className="form-floating mb-3">
                                <input ref={userNameRef} type="text" className="form-control" id="username"/>
                                <label htmlFor="username">Användarnamn</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input ref={passwordRef} type="password" className="form-control" id="password"/>
                                <label htmlFor="password">Lösenord</label>
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-success">Logga in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default LoginPage;