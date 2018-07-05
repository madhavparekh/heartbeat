// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const Layout = (props) => (
  <div>
    <Button onClick={() => props.fetchImpairedData(props.gauge_id)}>
      Get Impaired Data
    </Button>
    <Button onClick={() => props.fetchUnImpairedData(props.gauge_id)}>
      Get UnImpaired Data
    </Button>
    <Button onClick={() => props.fetchImpairedAggrData(props.gauge_id)}>
      Get Impaired Aggr Data
    </Button>
    <Button onClick={() => props.fetchUnImpairedAggrData(props.gauge_id)}>
      Get UnImpaired Aggr Data
    </Button>
    <ul>
      {props.unImpairedAggr &&
        props.unImpairedAggr.map((data) => (
          <li key={data.date}>{data.discharge}</li>
        ))}
    </ul>
  </div>
);

Layout.propTypes = {
  gauge_id: PropTypes.string.isRequired,
  fetchImpairedData: PropTypes.func.isRequired,
  fetchUnImpairedData: PropTypes.func.isRequired,
  fetchUnImpairedAggrData: PropTypes.func.isRequired,
  fetchImpairedAggrData: PropTypes.func.isRequired,
  unImpairedAggr: PropTypes.array,
};

export default Layout;
