import React, { Component } from 'react';

class Drink extends Component {
  render() {
    return (
      <div className='drink'>
        <p>{this.props.name}: {this.props.amount} cl of {this.props.strength}% alcohol</p>
        <p>Started drinking at {new Date(this.props.startTime).getTime()}</p>
      </div>
    );
  }
}

export default Drink;
