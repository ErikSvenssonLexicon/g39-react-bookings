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

const App = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.authState.isLoggedIn);

  useEffect(() => {
    if(!isLoggedIn){
      const token = localStorage.getItem("booking-api");
      if(token){
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
      }else {
        history.push("/index")
      }
    }

  },[history, isLoggedIn])

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
