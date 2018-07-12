import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
});

class ViewBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange(event, value) {
    const containerValues = ['impaired', 'unImpaired', 'unImpairedAggr']
    this.setState({ value });
    this.props.updateCurrentFlowDataName(containerValues[value])
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={(e, v) => this.handleChange(e, v)}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            <Tab label="Impaired" />
            <Tab label="UnImpaired" />
            <Tab label="Dimensionless Hydrograph" />
          </Tabs>
        </AppBar>
        {value === 0 && (
          <TabContainer>
            Flow Comparison: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla
            facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor
            quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id,
            pellentesque lobortis odio.
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            General Flow: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla
            facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor
            quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id,
            pellentesque lobortis odio.
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            Dimensionless Hydrograph: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat.
            Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia
            auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus
            id, pellentesque lobortis odio.
          </TabContainer>
        )}
      </div>
    );
  }
}

ViewBar.propTypes = {
  classes: PropTypes.object.isRequired,
  currentFlowDataName: PropTypes.string,
  updateCurrentFlowDataName: PropTypes.func,
};

export default withStyles(styles)(ViewBar);
