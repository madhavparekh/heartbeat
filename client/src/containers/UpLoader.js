/*eslint-disable*/
import React from 'react';
import axios from 'axios';
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
    const file = this.state.file;
    const formData = new FormData();
    formData.append('file', this.state.file);

    // axios
    //   .post(`${process.env.REACT_APP_NODE_SERVER}/api/users/upload`, formData, {
    //     headers: {
    //       Authorization: `jwt ${localStorage.getItem('HBT_TOKEN')}`,
    //       enctype: 'multipart/form-data',
    //     },
    //   })
    //   .then((res) => {
    //     if (res.status >= 400) {
    //       this.setState({
    //         message: 'You have been logged out! Redirecting to Login page..',
    //         err: true,
    //       });
    //       setTimeout(() => {
    //         this.setState({ reDirect: !this.state.reDirect });
    //       }, 1500);
    //     } else if (res.status < 400) {
    //       this.setState({
    //         message: 'File upload complete!!',
    //         err: false,
    //       });
    //     }
    //   })
    //   .catch((error) => console.log(error));

    request
      .post(`${process.env.REACT_APP_NODE_SERVER}/api/users/upload`)
      .attach('file', this.state.file)
      .set({
        Authorization: `jwt ${localStorage.getItem('HBT_TOKEN')}`,
      })
      .end((err, res) => {
        if (res.status === 401) {
          this.setState({
            message: 'You have been logged out! Redirecting to Login page..',
            err: true,
          });
          setTimeout(() => {
            localStorage.removeItem('HBT_TOKEN');
            localStorage.removeItem('HBT_USER_NAME');
            this.setState({ reDirect: !this.state.reDirect });
          }, 1500);
        } else if (res.status < 400) {
          this.setState({
            message: 'File upload complete!!',
            err: false,
          });
        } else {
          this.setState({
            message: `Sorry, having issues with our server! Error code ${
              res.status
            }. Server message ${res.body}`,
            err: false,
          });
        }
      });
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
