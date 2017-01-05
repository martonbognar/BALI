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
        <p>{this.props.name}: {this.props.amount} cl of {this.props.strength}% alcohol</p>
        <p>Started drinking at {new Date(this.props.startTime).getTime()}</p>
        <button onClick={this.remove}>Remove</button>
      </div>
    );
  }
}

export default Drink;
