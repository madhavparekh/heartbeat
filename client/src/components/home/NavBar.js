import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FlatButton from "material-ui/FlatButton";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import HeartBeatLogo from "../../HeartBeatLogo.jpg";
// logged in imports
// import MenuItem from "@material-ui/core/MenuItem";
// import Menu from "@material-ui/core/Menu";

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
    marginLeft: -45,
  },
  row: {
    display: "flex",
  },
  avatar: {
    marginRight: 8,
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
  // state = {
  //   anchorEl: null,
  // };

  // handleClick = event => {
  //   this.setState({ anchorEl: event.currentTarget });
  // };

  // handleClose = () => {
  //   this.setState({ anchorEl: null });
  // };

  render() {
    const { classes } = this.props;
    // const { anchorEl } = this.state;
    // const open = Boolean(anchorEl);

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
              variant="display1"
              color="inherit"
              className={classes.flex}
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                <div className={classes.row}>
                  <Avatar
                    alt="HeartBeatLogo"
                    src="../../HeartBeatLogo.jpg"
                    className={classes.avatar}
                  />
                  <Typography variant="display1">HeartBeat</Typography>
                </div>
              </Link>
            </Typography>
            {!localStorage.getItem("HBT_TOKEN") && (
              <div>
                <Button
                  href="/users/signin"
                  color="default"
                  variant="contained"
                  className={classes.signUpButton}
                >
                  SIGN UP
                </Button>
                <Button
                  href="/users/login"
                  color="default"
                  variant="contained"
                  className={classes.loginButton}
                >
                  LOGIN
                </Button>
                {/* <FlatButton color="inherit" className={classes.loginButton}>
                  <Typography variant="body2" color="inherit">
                    <Link to="/users/login">Login</Link>
                  </Typography>
                </FlatButton> */}
              </div>
            )}

            {localStorage.getItem("HBT_TOKEN") && (
              <div>
                <FlatButton color="inherit" style={{ marginRight: 15 }}>
                  <Typography variant="title" color="inherit">
                    {`Welcome ${localStorage.getItem("HBT_USER_NAME")}`}
                  </Typography>
                </FlatButton>

                <Button
                  href="/users/upload"
                  color="default"
                  variant="contained"
                  className={classes.loginButton}
                >
                  Upload CSV file
                </Button>

                <Button
                  href="/users/logout"
                  color="default"
                  variant="contained"
                  className={classes.loginButton}
                >
                  LOGOUT
                </Button>
              </div>
            )}

            {/* Buttons that will show up when logged in below */}

            {/* <div>
              <FlatButton
                aria-owns={anchorEl ? "account-menu" : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                My Account
              </FlatButton>
              <Menu
                id="account-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>Upload</MenuItem>
                <MenuItem onClick={this.handleClose}>Logout</MenuItem>
              </Menu>
            </div> */}
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
