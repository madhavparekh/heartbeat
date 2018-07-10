import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from "@material-ui/core/MenuItem";
import TextField from '@material-ui/core/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import * as userAction from '../../actions/user';

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

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange(e) {
    let field = e.target.name;
    this.setState({
      [field]: e.target.value,
    });
  }

  // handleChange = (email) => (event) => {
  //   this.setState({
  //     [email]: event.target.value,
  //   });
  // };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.container}>
          <TextField
            id="email"
            name="email"
            label="Email"
            className={classes.textField}
            placeholder="john@doe.com"
            onChange={(e) => this.handleChange(e)}
            margin="normal"
          />
          <TextField
            id="password-input"
            name="password"
            label="Password"
            className={classes.textField}
            placeholder="12345678"
            onChange={(e) => this.handleChange(e)}
            type="password"
            autoComplete="current-password"
            margin="normal"
          />
        </form>
        <RaisedButton
          label="Login"
          aria-label="Login"
          className={classes.loginButton}
          onClick={() =>
            this.props.logInUser(this.state.email, this.state.password)
          }
        />
        {this.props.success && <Redirect to={'/'} />}
      </div>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  logInUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    success: state.user.success,
    msg: state.user.msg,
    route: state.user.route,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logInUser: (email, password) =>
      dispatch(userAction.logInUser(email, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LoginForm));
