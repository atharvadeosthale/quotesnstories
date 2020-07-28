import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
