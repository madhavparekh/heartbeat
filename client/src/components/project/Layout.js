import React from "react";
//import PropTypes from "prop-types";
import NavBar from "../home/NavBar";
import BodyCard from "./BodyCard";

const Layout = () => (
  <div>
    <div>
      <NavBar />
    </div>
    <div className="BodyCard">
      <BodyCard />
    </div>
  </div>
);

// Layout.propTypes = {};

export default Layout;
