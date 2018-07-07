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
        gaugeId={props.gaugeId}
        unImpairedAggr={props.unImpairedAggr}
        impairedAggr={props.impairedAggr}
        impaired={props.impaired}
        unImpaired={props.unImpaired}
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
};

export default Layout;
