import React from "react";
import PropTypes from "prop-types";
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

Layout.propTypes = {
  todos: PropTypes.array.isRequired,
  fetchTodos: PropTypes.func.isRequired,
};

export default Layout;
