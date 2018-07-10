/*eslint-disable*/
import React from 'react';
import request from 'superagent';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from "@material-ui/core/MenuItem";
import { TextField, Input } from '@material-ui/core';
import RaisedButton from 'material-ui/RaisedButton';

import NavBar from '../components/home/NavBar';
import Aux from '../hoc/Auxilary';
import UpLoader from './UpLoader';

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class UpLoad extends React.Component {
  render() {
    return (
      <Aux>
        <NavBar />
        <UpLoader />
        {/* <h1>File Upload</h1>
        <form>
          <Input
            type="file"
            accept="application/csv"
            onChange={(e) => this.onChange(e)}
          />
        </form>

        <button
          type="submit"
          disabled={this.state.fileExt}
          onClick={(e) => this.onFormSubmit(e)}
        >
          Upload
        </button> */}
      </Aux>
    );
  }
}

export default UpLoad;
