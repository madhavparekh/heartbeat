import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
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
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       name: "John Doe",
  //       email: "johnnydoe@email.com",
  //       password: "password",
  //     };
  //   }

  //   handleChange = name => event => {
  //     this.setState({
  //       [name]: event.target.value,
  //     });
  //   };

  //   handleChange = email => event => {
  //     this.setState({
  //       [email]: event.target.value,
  //     });
  //   };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container}>
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          //   value={this.state.name}
          //   onChange={this.handleChange("name")}
          margin="normal"
        />
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          //   value={this.state.email}
          //   onChange={this.handleChange("email")}
          margin="normal"
        />
        <TextField
          id="password-input"
          label="Password"
          className={classes.textField}
          //   value={this.state.password}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
      </form>
    );
  }
}

SignUpForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUpForm);
