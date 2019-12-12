import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react'
import axios from 'axios';

const Flower = props => (
  <tr>
    <td>{props.flower.COMNAME}</td>
    <td>
      <Link to={"/" +props.flower.COMNAME}>Sightings</Link> | <Link to={"/update/" +props.flower.COMNAME}>Update Flower information</Link>
    </td>
  </tr>
)

export default class List extends Component {
  constructor(props) {
    super(props);

    this.state = {flowers: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/tables/get')
      .then(response => {
        this.setState({flowers: response.data})
        console.log(this.state.flowers)
      })
      .catch((error) => {
        console.log(error);
      })
    }

list() {
  return this.state.flowers.map(currentF => {
    return <Flower flower={currentF} key={currentF.COMNAME}/>;
  })
}

render() {
  return (
    <div>
      <h1>Flowers</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
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
