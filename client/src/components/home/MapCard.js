import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";

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

class MapCard extends React.Component {
  // const { classes } = props;
  //   const bull = <span className={classes.bullet}>•</span>;

  render() {

    return (
      <div>
        <Card>
          <CardContent>
            <Typography color="textSecondary">
              Map of the Rio Grande
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }  
}

MapCard.propTypes = {
  // classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MapCard);
