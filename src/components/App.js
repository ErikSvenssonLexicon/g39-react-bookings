import Navbar from "./NavBar";
import { Switch, Route, Redirect } from "react-router-dom";
import React, { useEffect } from "react";
import Container from "./layout/Container";
import PremisesPage from "./premises/PremisesPage";
import Premises from "./premises/Premises";
import { useSelector, useDispatch } from "react-redux";
import WelcomePage from "./WelcomePage";
import LoginPage from "./LoginPage";
import RegisterPatient from "./patient/RegisterPatient";
import jwtDecode from "jwt-decode";
import {useHistory} from "react-router-dom";
import PatientLanding from "./patient/PatientLanding";
import {setIsLoggedIn, setToken} from "./redux/reducers/authSlice";

const App = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.authState.isLoggedIn);

  useEffect(() => {
    if(!isLoggedIn){
      const token = localStorage.getItem("booking_user");
      if(token){
        const decodedToken = jwtDecode(token);
        const tokenExpiryDate = new Date(decodedToken["exp"]);
        const expiry = Math.floor(Date.now() / 1000);
        if(tokenExpiryDate.getTime() < expiry){
          history.push("/login")
        }else {
          if(decodedToken["authorities"].includes("ADMIN")){
            history.push("/premises")
          }else {
            history.push("/patient-landing")
          }
          dispatch(setToken({token: token, userDetails: decodedToken}));
          dispatch(setIsLoggedIn(true))
        }
      }else {
        history.push("/index")
      }
    }
  },[history, isLoggedIn, dispatch])

  return (
    <React.Fragment>
      {isLoggedIn && <Navbar />}
      <Container>
        <Switch>
          <Route path="/index">
            <WelcomePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/logout">
            <Redirect to="/index" />
          </Route>
          <Route path="/register">
            <RegisterPatient />
          </Route>
          <Route path="/" exact>
            <Redirect to="/index" />
          </Route>
          <Route path="/patient-landing">
            <PatientLanding />
          </Route>
          <Route exact path="/premises">
            <PremisesPage />
          </Route>
          <Route path="/premises/:id">
            <Premises />
          </Route>
        </Switch>
      </Container>
    </React.Fragment>
  );
};

export default App;
