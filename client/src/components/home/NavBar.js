import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FlatButton from "material-ui/FlatButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  loginButton: {
    marginLeft: 7,
    marginRight: 6,
  },
  signUpButton: {
    marginRight: 7,
  },
  appBar: {
    background: "linear-gradient(45deg, #03A9F4 30%, #80DEEA 90%)",
  },
};

// class NavBar extends React.Component {
// state = {
//   auth: true,
//   anchorEl: null,
// };

// handleChange = (event, checked) => {
//   this.setState({ auth: checked });
// };

// handleMenu = event => {
//   this.setState({ anchorEl: event.currentTarget });
// };

// handleClose = () => {
//   this.setState({ anchorEl: null });
// };

//   login: {
//     marginRight: 15,
//     marginLeft: 5,
//   },
// };

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: true,
      anchorEl: null,
    };
  }

  handleChange(event, checked) {
    this.setState({ auth: checked });
  }

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar color="inherit">
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            />

            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              HeartBeat
            </Typography>
            <FlatButton color="inherit" className={classes.signUpButton}>
              <Typography
                variant="body2"
                color="inherit"
                // className={classes.flex}
              >
                Sign Up
              </Typography>
            </FlatButton>
            <FlatButton color="inherit" className={classes.loginButton}>
              <Typography
                variant="body2"
                color="inherit"
                // className={classes.flex}
              >
                Login
              </Typography>
            </FlatButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
