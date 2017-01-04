import React, { Component } from 'react';

class Drink extends Component {
  constructor(props) {
    super(props);
    this.state = {id: props.id, name: props.name, amount: props.amount, strength: props.strength, startTime: props.startTime, finishTime: props.finishTime};
    alert(JSON.stringify(props));

    this.onFinish = this.onFinish.bind(this);
  }

  onFinish() {
    this.props.onFinish(this.state.id);
  }

  render() {
    let finishDiv = this.state.finishTime === null ? <button onClick={this.onFinish}>Finished</button> : <p>finished at {this.state.finishTime.getTime()}</p>;

    return (
      <div className='drink'>
        <p>{this.state.name}: {this.state.amount} cl of {this.state.strength}% alcohol</p>
        <p>Started drinking at {this.state.startTime.getTime()}</p>
        {finishDiv}
      </div>
    );
  }
}

export default Drink;
