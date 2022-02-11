import Navbar from "./NavBar";
import { Switch, Route} from "react-router-dom";
import React from "react";
import Container from "./layout/Container";
import PremisesPage from "./premises/PremisesPage";
import Premises from "./premises/Premises";

const App = (props) => {  
  return (
    <React.Fragment>
      <Navbar />
      <Container>
        <Switch>
          <Route exact path="/premises" component={PremisesPage} />
          <Route path="/premises/:id" component={Premises} />                   
        </Switch>
      </Container>
    </React.Fragment>
  );
};

export default App;
