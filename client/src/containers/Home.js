import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchTodos } from "../actions/todo";
import Layout from "../components/home/Layout";

export class Home extends React.Component {
  render() {
    return (
      <Layout
        todos={this.props.todos}
        fetchTodos={() => this.props.fetchTodos()}
      />
    );
  }
}

Home.propTypes = {
  todos: PropTypes.array.isRequired,
  fetchTodos: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    todos: state.todo.todos,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTodos: () => dispatch(fetchTodos()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
