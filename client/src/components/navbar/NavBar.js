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

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
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

class NavBar extends React.Component {
  render() {
    const { classes } = this.props;
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
