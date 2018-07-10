import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as userAction from '../../actions/user';

import { withStyles } from '@material-ui/core/styles';
// import MenuItem from "@material-ui/core/MenuItem";
import { TextField, FormHelperText, FormControl } from '@material-ui/core';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
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
      <form className={classes.container}>
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          required
          name="name"
          //   value={this.state.name}
          //   onChange={this.handleChange("name")}
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
            //   onChange={this.handleChange("email")}
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
        {this.state.password.length >= 8 && (
          <TextField
            id="password-input"
            label="Re Enter Password"
            name="matchpassword"
            className={classes.textField}
            //   value={this.state.password}
            type="password"
            autoComplete="current-password"
            margin="normal"
          />
        )}
      </form>
    );
  }
}

SignUpForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    msg: state.user.msg,
    route: state.user.route,
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
