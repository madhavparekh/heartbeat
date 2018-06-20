import React from "react";
import PropTypes from "prop-types";
import Count from "../../containers/Count";

const Layout = props => (
  <div style={{ marginBottom: "100px" }}>
    <ul>{props.todos.map(todo => <li key={`todo-${todo}`}>{todo}</li>)}</ul>

    <button onClick={() => props.fetchTodos()}>Click to fetch Todos</button>

    <div style={{ marginTop: "40px" }}>
      <Count />
    </div>
  </div>
);

Layout.propTypes = {
  todos: PropTypes.array.isRequired,
  fetchTodos: PropTypes.func.isRequired,
};

export default Layout;
