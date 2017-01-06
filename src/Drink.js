import React, { Component } from 'react';

class Drink extends Component {
  constructor(props) {
    super(props);

    this.remove = this.remove.bind(this);
  }

  remove() {
    this.props.onRemove(this);
  }

  render() {
    return (
      <div className='drink'>
        <h3>{this.props.name}</h3>
        <ul>
          <li>{this.props.amount} cl</li>
          <li>{this.props.strength}%</li>
          <li>Started at {new Date(this.props.startTime).toString()}</li>
        </ul>
        <button onClick={this.remove} className='remove'>Remove</button>
      </div>
    );
  }
}

export default Drink;
