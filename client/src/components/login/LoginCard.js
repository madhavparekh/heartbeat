import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import RaisedButton from "material-ui/RaisedButton";
import Grid from "@material-ui/core/Grid";

import LoginForm from "./LoginForm";

const styles = {
  card: {
    maxWidth: "100%",
    marginTop: 16,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 5,
  },

  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  actions: {
    display: "flex",
  },
  loginButton: {
    marginLeft: "auto",
    marginRight: 10,
    display: "flex",
  },
};

class LoginCard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardHeader title="Login" subheader="" />
            <CardContent>
              {/* <Typography className={classes.title}>
              <h1>Login</h1>
            </Typography> */}
              <LoginForm />
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <RaisedButton
                label="Login"
                aria-label="Login"
                className={classes.loginButton}
              />
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

LoginCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginCard);
