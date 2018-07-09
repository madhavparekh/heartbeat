import React from 'react';
import request from 'superagent';

class UpLoad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileExt: true,
    };
  }
  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    const formData = new FormData();
    formData.append('files', this.state.file);
    request
      .post(`${process.env.REACT_APP_NODE_SERVER}/api/users/upload`)
      .send(formData)
      .set({
        Authorization: `JWT ${localStorage.getItem('HBT_TOKEN')}`,
      })
      .end((err, res) => {
        if (err) return this.render(<p>Error uploading</p>);
        else {
          return this.render(<p>{res.body}</p>);
        }
      });

    // this.fileUpload(this.state.file).then((response) => {
    //   console.log(response.data);
  }
  onChange(e) {
    if (e.target.files[0].name.indexOf('.csv') !== -1) {
      console.log('csv');
      this.setState({ fileExt: false });
    }
    this.setState({ file: e.target.files[0] });
  }

  render() {
    return (
      <form>
        <h1>File Upload</h1>
        <input type="file" accept=".csv" onChange={(e) => this.onChange(e)} />
        <button
          type="submit"
          disabled={this.state.fileExt}
          onClick={(e) => this.onFormSubmit(e)}
        >
          Upload
        </button>
      </form>
    );
  }
}

export default UpLoad;
