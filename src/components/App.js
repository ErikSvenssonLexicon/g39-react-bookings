import Navbar from "./NavBar";
import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import Container from "./layout/Container";
import PremisesPage from "./premises/PremisesPage";

const App = (props) => {  
  return (
    <React.Fragment>
      <Navbar />
      <Container>
        <Switch>
          <Route exact path="/premises" component={PremisesPage} />                    
        </Switch>
      </Container>
    </React.Fragment>
  );
};

export default App;
