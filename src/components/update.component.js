import React, { Component } from 'react';
import axios from 'axios';

export default class EditFlower extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: ''
    }
  }
//used to change message
  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }
//sets message to new input value on submit
  onSubmit(e) {
    e.preventDefault();

    const flower = {
      name: this.state.name
    }

    console.log (flower);

    axios.post('http://localhost:5000/tables/update/' + this.props.match.params.comname, flower)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Update Flower Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Info" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
