import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


const Sighting = props => (
  <tr>
    <td>{props.sighting.PERSON}</td>
    <td>{props.sighting.LOCATION}</td>
    <td>{props.sighting.SIGHTED}</td>
  </tr>
)

export default class Sight extends Component {
  constructor(props) {
    super(props);

    this.state = {sightings: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/tables/get/'+ this.props.match.params.comname)
      .then(response => {
        this.setState({sightings: response.data})
        console.log(this.state.sightings);
      })
      .catch((error) => {
        console.log(error);
      })
    }


list() {
  return this.state.sightings.map(currentS => {
    return <Sighting sighting={currentS} key={currentS.NAME, currentS.PERSON, currentS.LOCATION, currentS.SIGHTED}/>;
  })
}

render() {
  return (
    <div>
      <h1>Flowers</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Person</th>
            <th>Location</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {this.list()}
        </tbody>
      </table>
    </div>
  )
}
}
