import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchGuages } from "../actions/guage";
import Layout from "../components/guage/Layout";

class Guage extends React.Component {
    render() {
        return (
            <Layout
                guages={this.props.guages}
                fetchGuages={river => this.props.fetchGuages(river)}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        guages: state.guage.guages,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGuages: () => dispatch(fetchGuages(river)),
    };
};

Guage.propTypes = {
    fetchGuages: PropTypes.func.isRequired,
    fetchDefaultData: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Guage);
