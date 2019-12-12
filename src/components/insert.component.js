import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Insert extends Component {
  constructor(props) {
    super(props);

    this.onChangeFlower = this.onChangeFlower.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeSighted = this.onChangeSighted.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      flower: '',
      name: '',
      location: '',
      sighted: ''
    }
  }


  onChangeFlower(e) {
    this.setState({
      flower: e.target.value
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    });
  }

  onChangeSighted(e) {
    this.setState({
      sighted: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const insert = {
      flower: this.state.flower,
      name: this.state.name,
      location: this.state.location,
      sighted: this.state.sighted
    }
    console.log(insert)

    axios.post('http://localhost:5000/tables/insert', insert)
      .then(res => console.log(res.data))


    this.setState({
      flower: '',
      name: '',
      location: '',
      sighted: ''
    })

    window.location = '/';
  }


  render() {
    return (
      <div>
        <h2>Add New Sighting</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label> Flower: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.flower}
              onChange={this.onChangeFlower}
              />
          </div>
          <div className="form-group">
            <label> Person: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              />
          </div>
          <div className="form-group">
            <label> Location: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.location}
              onChange={this.onChangeLocation}
              />
          </div>
          <div className="form-group">
            <label> Date: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.sighted}
              onChange={this.onChangeSighted}
              />
          </div>
      <div className="form-group">
          <input type="submit" value="Post" className="btn btn-primary"

           />
        </div>
      </form>
    </div>
    )
  }
}
