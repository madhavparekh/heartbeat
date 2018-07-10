import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import Grid from '@material-ui/core/Grid';
import GraphCard from './GraphCard';
import MapCard from './MapCard';
import ViewCard from './ViewCard';
import DescriptionCard from './DescriptionCard';
//import NavBar from "./NavBar";

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
    marginLeft: 5,
    // marginRight: 4,
  },
  viewCard: {
    // padding: 2,
    // marginLeft: 4,
    marginRight: 5,
    // marginLeft: "auto",
  },
  graphCard: {
    marginLeft: 5,
    marginRight: 5,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class BodyCard extends React.Component {
  constructor(props) {
    super(props);

    // this.changeGraph = changeGraph();
  }

  // state = {
  //   currentGraph: defaultGraph,
  // }

  changeGraph() {}

  render() {
    return (
      <div>
        <Grid item xs={12}>
          <Card className={styles.card}>
            <CardContent>
              <Grid container spacing={8}>
                <Grid item xs={12} className={styles.descCard}>
                  <DescriptionCard />
                </Grid>
                {/* </Grid> */}

                {/* <Grid container spacing={8} xs className={this.props.middleCards}> */}
                <Grid item xs className={styles.mapCard}>
                  <MapCard />
                </Grid>
                <Grid item xs={8} className={styles.viewCard}>
                  <ViewCard
                    currentFlowDataName={this.props.currentFlowDataName}
                    updateCurrentFlowDataName={(name) =>
                      this.props.updateCurrentFlowDataName(name)
                    }
                  />
                </Grid>
                {/* </Grid> */}
                {/* <Grid container spacing={8}> */}
                <Grid item xs={12} className={styles.graphCard}>
                  <GraphCard
                    fetchFlowData={(gaugeId) => {
                      this.props.fetchFlowData(gaugeId);
                    }}
                    gaugeId={this.props.gaugeId}
                    gauges={this.props.gauges}
                    unImpairedAggr={this.props.unImpairedAggr}
                    impairedAggr={this.props.impairedAggr}
                    impaired={this.props.impaired}
                    unImpaired={this.props.unImpaired}
                    currentFlowDataName={this.props.currentFlowDataName}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }
}

BodyCard.propTypes = {
  gaugeId: PropTypes.string.isRequired,
  unImpairedAggr: PropTypes.array,
  unImpaired: PropTypes.array,
  impairedAggr: PropTypes.array,
  impaired: PropTypes.array,
  classes: PropTypes.object.isRequired,
  currentFlowDataName: PropTypes.string,
  updateCurrentFlowDataName: PropTypes.func,
};

export default withStyles(styles)(BodyCard);
