import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import ViewBar from "./ViewBar";

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function ViewCard(props) {
  const { classes } = props;
  //   const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Graph View Options
          </Typography>
          <ViewBar
            currentFlowDataName={props.currentFlowDataName}
            updateCurrentFlowDataName={(name) => props.updateCurrentFlowDataName(name)}
           />
        </CardContent>
      </Card>
    </div>
  );
}

ViewCard.propTypes = {
  classes: PropTypes.object.isRequired,
  currentFlowDataName: PropTypes.string,
  updateCurrentFlowDataName: PropTypes.func,
};

export default withStyles(styles)(ViewCard);
