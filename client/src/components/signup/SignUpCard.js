import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import SignUpForm from "./SignUpForm";

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
  signUpButton: {
    marginLeft: "auto",
    marginRight: 10,
    display: "flex",
  },
};

class SignUpCard extends React.Component {
  render() {
    return (
      <Card
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <div>
          <CardHeader
            title="Signup"
            subheader="Signup to upload data"
            style={{ paddingLeft: "10px" }}
          />
          <SignUpForm />
        </div>
      </Card>
    );
  }
}

SignUpCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUpCard);
