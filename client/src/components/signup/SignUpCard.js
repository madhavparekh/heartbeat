import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Typography from "@material-ui/core/Typography";
import RaisedButton from 'material-ui/RaisedButton';
import Grid from '@material-ui/core/Grid';

import SignUpForm from './SignUpForm';

const styles = {
  card: {
    maxWidth: '100%',
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
    display: 'flex',
  },
  signUpButton: {
    marginLeft: 'auto',
    marginRight: 10,
    display: 'flex',
  },
};

class SignUpCard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardHeader title="Sign Up" subheader="" />
            <CardContent>
              {/* <Typography className={classes.title}>
              <h1>SignUp</h1>
            </Typography> */}
              <SignUpForm />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

SignUpCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUpCard);
