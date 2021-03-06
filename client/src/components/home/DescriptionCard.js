import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import RaisedButton from "material-ui/RaisedButton";

const styles = () => ({
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  actions: {
    display: "flex",
  },
  expand: {
    transform: "rotate(0deg)",

    marginLeft: "auto",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  projButton: {
    marginLeft: "auto",
    marginRight: 10,
    display: "flex",
  },
});

class DescriptionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  handleExpandClick() {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader title="Project Description" subheader="" />
        <CardContent>
          <Typography component="p" paragraph>
            When you go to the doctor and (s)he wants to know the strength of
            your heart, (s)he orders a cardiograph, which shows the your
            heartbeat as the seconds pass. Similarly, when we analyze rivers, we
            build “hydrographs” which in a very figurative analogy, hydrographs
            are the cardiographs of a river. A cardiograph show your heartbeat
            in five or ten seconds, however, river have a longer pace, their
            heartbeat cycle is not a few seconds but an entire year. Let’s start
            with a basin that I know pretty well, the Rio Grande basin (also
            known in Mexico as the Rio Bravo). We will call it the RGB for Rio
            Grande/Bravo. In its natural form, it had three main type of beats:
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <RaisedButton
            label="Project Details"
            aria-label="Project Details"
            className={classes.projButton}
          />
        </CardActions>
      </Card>
    );
  }
}

DescriptionCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DescriptionCard);
