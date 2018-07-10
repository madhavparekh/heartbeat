import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as userAction from '../../actions/user';

import { withStyles } from '@material-ui/core/styles';
// import MenuItem from "@material-ui/core/MenuItem";
import { TextField, FormHelperText, FormControl } from '@material-ui/core';
import RaisedButton from 'material-ui/RaisedButton';
import Aux from '../../hoc/Auxilary';

const emailRegex = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/i;
const styles = (theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      matchpassword: '',
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
      <Aux>
        <form className={classes.container}>
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            required
            name="name"
            onChange={(e) => {
              this.handleChange(e);
            }}
            margin="normal"
          />
          <FormControl>
            <TextField
              id="email"
              label="Email"
              name="email"
              required
              className={classes.textField}
              //   value={this.state.email}
              onChange={(e) => {
                this.handleChange(e);
              }}
              margin="normal"
            />
            {!emailRegex.test(this.state.email) && (
              <FormHelperText style={{ color: 'red', marginLeft: 8 }}>
                Invalid email
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <TextField
              id="password-input"
              label="Password"
              name="password"
              className={classes.textField}
              onChange={(e) => this.handleChange(e)}
              type="password"
              required
              autoComplete="current-password"
              margin="normal"
            />
            {this.state.password.length < 8 && (
              <FormHelperText style={{ color: 'red', marginLeft: 8 }}>
                Must be 8 char or longer
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            {this.state.password.length >= 8 && (
              <TextField
                id="password-input"
                label="Re Enter Password"
                name="matchpassword"
                className={classes.textField}
                onChange={(e) => this.handleChange(e)}
                type="password"
                autoComplete="current-password"
                margin="normal"
              />
            )}
            {this.state.password.length >= 8 &&
              this.state.password !== this.state.matchpassword && (
                <FormHelperText style={{ color: 'red', marginLeft: 8 }}>
                  {`Re-entered password doesn't match`}
                </FormHelperText>
              )}
          </FormControl>
        </form>
        <RaisedButton
          label="SignUp"
          aria-label="SignUp"
          className={classes.signUpButton}
          onClick={() =>
            this.props.signUpUser(
              this.state.name,
              this.state.email,
              this.state.password
            )
          }
          disabled={
            !(
              this.state.matchpassword === this.state.password &&
              this.state.matchpassword !== ''
            )
          }
        />
        {this.props.success && <Redirect to={this.props.route} />}
      </Aux>
    );
  }
}

SignUpForm.propTypes = {
  classes: PropTypes.object.isRequired,
  signUpUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    msg: state.user.msg,
    route: state.user.route,
    success: state.user.success,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUpUser: (name, email, password) =>
      dispatch(userAction.signUpUser(name, email, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignUpForm));
