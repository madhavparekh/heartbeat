/*eslint-disable*/
import React from 'react';
import request from 'superagent';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { TextField, FormHelperText } from '@material-ui/core';

import Aux from '../hoc/Auxilary';

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

class UpLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileExt: true,
      message: '',
      err: false,
      reDirect: false,
    };
  }
  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    const formData = new FormData();
    formData.append('file', this.state.file);
    request
      .post(`${process.env.REACT_APP_NODE_SERVER}/api/users/upload`)
      .send(formData)
      .set({
        Authorization: `jwt ${localStorage.getItem('HBT_TOKEN')}`,
      })
      .end((err, res) => {
        if (res.status >= 400) {
          this.setState({
            message: 'You have been logged out! Redirecting to Login page..',
            err: true,
          });
          setTimeout(() => {
            this.setState({ reDirect: !this.state.reDirect });
          }, 1500);
        } else if (res.status < 400) {
          this.setState({
            message: 'File upload complete!!',
            err: false,
          });
        }
      });

    // this.fileUpload(this.state.file).then((response) => {
    //   console.log(response.data);
  }
  onChange(e) {
    if (e.target.files[0].name.indexOf('.csv') !== -1) {
      this.setState({ fileExt: !this.state.fileExt });
    } else {
      this.setState({ fileExt: !this.state.fileExt });
    }
    this.setState({
      message: '',
      file: e.target.files[0],
    });
  }

  render() {
    return (
      <Aux>
        <TextField
          type="file"
          accept="application/csv"
          onChange={(e) => this.onChange(e)}
        />

        <button
          type="submit"
          disabled={this.state.fileExt}
          onClick={(e) => this.onFormSubmit(e)}
        >
          Upload
        </button>
        {this.state.fileExt && (
          <FormHelperText style={{ color: 'red', marginLeft: 8 }}>
            Must be CSV (comma separated file)
          </FormHelperText>
        )}
        {this.state.message && (
          <FormHelperText
            style={{ color: this.state.err ? 'red' : 'black', marginLeft: 8 }}
          >
            {this.state.message}
          </FormHelperText>
        )}
        {this.state.reDirect && <Redirect to={'/users/login'} />}
      </Aux>
    );
  }
}

export default UpLoader;
