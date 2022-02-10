import Navbar from "./NavBar";
import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import Container from "./layout/Container";

const App = (props) => {
  //Navbar
  //Rest of application
  return (
    <React.Fragment>
      <Navbar />
      <Container>
        <Switch>
          <Route exact path="/premises">
            <h1>Premises</h1>
          </Route>
        </Switch>
      </Container>
    </React.Fragment>
  );
};

export default App;
