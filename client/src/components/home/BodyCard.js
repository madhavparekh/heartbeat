import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import GraphCard from "./GraphCard";
import MapCard from "./MapCard";
import ViewCard from "./ViewCard";

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
  // const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec
            vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
            pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque
            lobortis odio.
          </Typography>
          <MapCard />
          <ViewCard />
          <GraphCard />
        </CardContent>
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    </div>
  );
}

BodyCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BodyCard);
