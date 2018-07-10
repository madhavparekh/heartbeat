import React from 'react';
import ProtoTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class GaugePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose(e) {
    this.props.fetchFlowData(e.target.value.toString().padStart(8, '0'));
    this.setState({ anchorEl: null });
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <RaisedButton
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={(e) => {
            this.handleClick(e);
          }}
          style={{ width: '250px' }}
        >
          Select Gauge
        </RaisedButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {this.props.gauges.map((gauge) => {
            return (
              <MenuItem
                key={gauge.gauge_id}
                value={gauge.gauge_id}
                onClick={(e) => {
                  this.handleClose(e);
                }}
              >
                {gauge.gauge_id} - {gauge.river_name} : {gauge.description}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    );
  }
}

GaugePicker.propTypes = {
  gauges: ProtoTypes.array.isRequired,
};

export default GaugePicker;
