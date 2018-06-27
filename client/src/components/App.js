/* eslint-disable import/no-named-as-default */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// import Theme from "../styles/Theme";
import Home from "../containers/Home";
import Count from "../containers/Count";

const App = () => (
  <div>
    <MuiThemeProvider>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/count" component={Count} />
      </Switch>
    </MuiThemeProvider>
  </div>
);

App.propTypes = {
  children: PropTypes.element,
};

export default App;
