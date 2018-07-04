import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import Grid from "@material-ui/core/Grid";
import DescriptionCard from "./DescriptionCard";
import ResearchCard from "./ResearchCard";
import TechCard from "./TechCard";

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

function BodyCard(props) {
  const { classes } = props;

  return (
    <div>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardContent>
            <Grid container>
              <Grid item xs={12} className={classes.allCards}>
                <DescriptionCard />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={6} className={classes.allCards}>
                {/* import Research Team */}
                <ResearchCard />
              </Grid>
              <Grid item xs={6} className={classes.allCards}>
                {/* import Technology Team */}
                <TechCard />
              </Grid>
            </Grid>
            <Grid item xs={12} />
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
