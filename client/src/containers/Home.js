import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchTodos } from "../actions/todo";

//water project
import { fetchDefaultData } from "../actions/record"

import Layout from "../components/home/Layout";

export class Home extends React.Component {
  render() {
    return (
      <Layout
        todos={this.props.todos}
        fetchTodos={() => this.props.fetchTodos()}

        //water project
        fetchDefaultData={() => this.props.fetchDefaultData()}
      />
    );
  }
}

Home.propTypes = {
  todos: PropTypes.array.isRequired,
  fetchTodos: PropTypes.func.isRequired,

  //water project 
  fetchDefaultData: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    todos: state.todo.todos,

    //water project
    defaultView: state.record.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTodos: () => dispatch(fetchTodos()),
    
    //water project
    fetchDefaultData: () => dispatch(fetchDefaultData()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
