import React, { Component } from 'react';

class Drink extends Component {
  constructor(props) {
    super(props);
    this.state = {name: props.name, amount: props.amount, strength: props.strength, startTime: props.startTime, finishTime: props.finishTime};
  }

  render() {
    return (
      <div className='drink'>
        <p>{this.state.name}: {this.state.amount} cl of {this.state.strength}% alcohol</p>
        <p>Started drinking at {this.state.startTime.getTime()}, finished at {this.state.finishTime.getTime()}</p>
      </div>
    );
  }
}

export default Drink;
