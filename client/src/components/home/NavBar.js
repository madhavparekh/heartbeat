import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FlatButton from 'material-ui/FlatButton';
// logged in imports
// import MenuItem from "@material-ui/core/MenuItem";
// import Menu from "@material-ui/core/Menu";

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
    background: 'linear-gradient(45deg, #03A9F4 30%, #80DEEA 90%)',
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
<<<<<<< HEAD
  // state = {
  //   anchorEl: null,
  // };

  // handleClick = event => {
  //   this.setState({ anchorEl: event.currentTarget });
  // };
=======
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      anchorEl: null,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('HTB_TOKEN')) {
      this.setState({ auth: true });
    }
  }

  handleChange() {
    this.setState({ auth: !this.state.auth });
  }
>>>>>>> b68f0e269e72595f5bbfa295a541874de4dad3de

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
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              HeartBeat
            </Typography>
            <FlatButton color="inherit" className={classes.signUpButton}>
              <Typography variant="body2" color="inherit">
                Sign Up
              </Typography>
            </FlatButton>
            <FlatButton color="inherit" className={classes.loginButton}>
              <Typography variant="body2" color="inherit">
                Login
              </Typography>
            </FlatButton>
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
