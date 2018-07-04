import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import Grid from "@material-ui/core/Grid";
import GraphCard from "./GraphCard";
import MapCard from "./MapCard";
import ViewCard from "./ViewCard";
import DescriptionCard from "./DescriptionCard";

const styles = {
  descCard: {
    marginLeft: 5,
    marginRight: 5,
  },
  middleCards: {
    // padding: 2,
    marginTop: 5,
    marginLeft: 2,
    marginRight: 5,
    marginBottom: 5,
  },
  mapCard: {
    // marginLeft: 4,
    // marginRight: 4,
  },
  viewCard: {
    // padding: 2,
    // marginLeft: 4,
    // marginRight: 4,
    // marginLeft: "auto",
  },
  graphCard: {
    marginLeft: 5,
    marginRight: 5,
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

function BodyCard(props) {
  const { classes } = props;

  return (
    <div>
      <Grid item xs={24}>
        <Card className={classes.card}>
          <CardContent>
            <Grid container spacing={8}>
              <Grid item xs className={classes.descCard}>
                <DescriptionCard />
              </Grid>
            </Grid>

            <Grid container spacing={8} xs className={classes.middleCards}>
              <Grid item xs className={classes.mapCard}>
                <MapCard />
              </Grid>
              <Grid item xs={8} className={classes.viewCard}>
                <ViewCard />
              </Grid>
            </Grid>
            <Grid container spacing={8}>
              <Grid item xs className={classes.graphCard}>
                <GraphCard />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

BodyCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BodyCard);
