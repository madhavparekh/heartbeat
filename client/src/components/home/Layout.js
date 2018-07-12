import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";

// import GraphCard from "./GraphCard";
import ViewCard from "./ViewCard";
import DescriptionCard from "./DescriptionCard";
import Map from "../../containers/Map";

const Layout = props => (
  <Card className={styles.card}>
    <DescriptionCard />

    <div style={{ display: "flex" }}>
      <Map />
      <ViewCard
        currentFlowDataName={props.currentFlowDataName}
        updateCurrentFlowDataName={name =>
          props.updateCurrentFlowDataName(name)
        }
      />
    </div>

    {/* <GraphCard
      fetchFlowData={gaugeId => {
        props.fetchFlowData(gaugeId);
      }}
      gaugeId={props.gaugeId}
      gauges={props.gauges}
      unImpairedAggr={props.unImpairedAggr}
      impairedAggr={props.impairedAggr}
      impaired={props.impaired}
      unImpaired={props.unImpaired}
      currentFlowDataName={props.currentFlowDataName}
    /> */}
  </Card>
);

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

Layout.propTypes = {
  gauges: PropTypes.array,
  fetchFlowData: PropTypes.func,
  gaugeId: PropTypes.string,
  unImpairedAggr: PropTypes.array,
  unImpaired: PropTypes.array,
  impairedAggr: PropTypes.array,
  impaired: PropTypes.array,
  currentFlowDataName: PropTypes.string,
  updateCurrentFlowDataName: PropTypes.func,
};

export default Layout;
