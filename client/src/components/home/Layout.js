import React from 'react';
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import BodyCard from './BodyCard';

const Layout = (props) => (
  <div>
    <div>
      <NavBar />
    </div>
    <div className="BodyCard">
      <BodyCard
        gauges={props.gauges}
        fetchFlowData={(gaugeId) => {
          props.fetchFlowData(gaugeId);
        }}
        gaugeId={props.gaugeId}
        unImpairedAggr={props.unImpairedAggr}
        impairedAggr={props.impairedAggr}
        impaired={props.impaired}
        unImpaired={props.unImpaired}
        currentFlowDataName={props.currentFlowDataName}
        updateCurrentFlowDataName={(name) =>
          props.updateCurrentFlowDataName(name)
        }
      />
    </div>
  </div>
);

Layout.propTypes = {
  gaugeId: PropTypes.string,
  unImpairedAggr: PropTypes.array,
  unImpaired: PropTypes.array,
  impairedAggr: PropTypes.array,
  impaired: PropTypes.array,
  currentFlowDataName: PropTypes.string,
  updateCurrentFlowDataName: PropTypes.func,
};

export default Layout;
