import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { TextField, FormHelperText, FormControl } from "@material-ui/core";
import RaisedButton from "material-ui/RaisedButton";

import * as userAction from "../../actions/user";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange(e) {
    let field = e.target.name;
    this.setState({
      [field]: e.target.value,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div style={{ margin: "0px 10px 10px 10px" }}>
        <form>
          <FormControl style={{ width: "400px" }}>
            <TextField
              id="email"
              name="email"
              fullWidth={true}
              label="Email"
              placeholder="john@doe.com"
              onChange={e => this.handleChange(e)}
              margin="normal"
            />
            <TextField
              id="password-input"
              name="password"
              label="Password"
              fullWidth={true}
              placeholder="12345678"
              onChange={e => this.handleChange(e)}
              type="password"
              autoComplete="current-password"
              margin="normal"
            />
            {this.props.msg && (
              <FormHelperText style={{ color: "red" }}>
                Invalid email and/or password
              </FormHelperText>
            )}
          </FormControl>
        </form>
        <RaisedButton
          style={{ marginTop: "20px", marginBottom: "20px" }}
          label="Login"
          aria-label="Login"
          className={classes.loginButton}
          onClick={() =>
            this.props.logInUser(this.state.email, this.state.password)
          }
        />

        {this.props.success && <Redirect to={this.props.route} />}
      </div>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  logInUser: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  route: PropTypes.string.isRequired,
  msg: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    success: state.user.success,
    msg: state.user.msg,
    route: state.user.route,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logInUser: (email, password) =>
      dispatch(userAction.logInUser(email, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LoginForm));
