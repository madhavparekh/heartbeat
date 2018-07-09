/* eslint-disable import/no-named-as-default */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"; //eslint-disable-line

// import Theme from "../styles/Theme";
<<<<<<< HEAD
import Home from "../containers/Home";
import Project from "../containers/Project";
import FlowData from "../containers/FlowData";
import SignUp from "../containers/SignUp";
import Login from "../containers/Login";
=======
import Home from '../containers/Home';
import Project from '../containers/Project';
import FlowData from '../containers/FlowData';
import User from '../containers/User';
<<<<<<< HEAD
>>>>>>> user auth, routes, redux, file upload
=======
import UpLoad from '../containers/UpLoad';
>>>>>>> file upload under user auth route

const App = () => (
  <div>
    <MuiThemeProvider>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/project" component={Project} />
        <Route exact path="/flowdata" component={FlowData} />
<<<<<<< HEAD
        <Route exact path="/users/signin" component={SignUp} />
        <Route exact path="/users/login" component={Login} />
=======
        <Route exact path="/user" component={User} />
<<<<<<< HEAD
>>>>>>> user auth, routes, redux, file upload
=======
        <Route exact path="/upload" component={UpLoad} />
>>>>>>> file upload under user auth route
      </Switch>
    </MuiThemeProvider>
  </div>
);

App.propTypes = {
  children: PropTypes.element,
};

export default App;
