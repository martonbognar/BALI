import React, { Component } from 'react';

class NewDrink extends Component {
  constructor(props) {
    super(props);
    this.resetState();

    this.resetState = this.resetState.bind(this);
    this.handleNameChanged = this.handleNameChanged.bind(this);
    this.handleAmountChanged = this.handleAmountChanged.bind(this);
    this.handleStrengthChanged = this.handleStrengthChanged.bind(this);
    this.handleStartTimeChanged = this.handleStartTimeChanged.bind(this);
    this.handleFinishTimeChanged = this.handleFinishTimeChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetState() {
    this.state = {name: "", amount: 0, strength: 0, startTime: new Date(), finishTime: new Date()};
  }

  handleNameChanged(event) {
    this.setState({name: event.target.value});
  }

  handleAmountChanged(event) {
    this.setState({amount: event.target.value});
  }

  handleStrengthChanged(event) {
    this.setState({strength: event.target.value});
  }

  handleStartTimeChanged(event) {
    this.setState({startTime: new Date(event.target.value)});
  }

  handleFinishTimeChanged(event) {
    this.setState({finishTime: new Date(event.target.value)});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onChange(this.state);
    this.resetState();
  }

  render() {
    let startString = this.state.startTime.toISOString().substring(0, 16);
    let finishString = this.state.finishTime.toISOString().substring(0, 16);

    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' onChange={this.handleNameChanged} value={this.state.name} placeholder='Name' required />
        <input type='number' onChange={this.handleAmountChanged} value={this.state.amount} placeholder='Amount (cl)' min='0' required />
        <input type='number' onChange={this.handleStrengthChanged} value={this.state.strength} placeholder='Strength (%)' min='0' max='100' required />
        <input type='datetime-local' onChange={this.handleStartTimeChanged} required value={startString} />
        <input type='datetime-local' onChange={this.handleFinishTimeChanged} required value={finishString} />
        <input type='submit' />
      </form>
    );
  }
}

export default NewDrink;
