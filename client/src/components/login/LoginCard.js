import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

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
    return (
      <Card
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <div>
          <CardHeader
            title="Login"
            subheader="Login to upload data"
            style={{ paddingLeft: "10px" }}
          />
          <LoginForm />
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(LoginCard);
