import React, { Component } from 'react';

class NewDrink extends Component {
  constructor(props) {
    super(props);
    this.resetState();

    this.resetState = this.resetState.bind(this);
    this.refreshStartTime = this.refreshStartTime.bind(this);
    this.handleNameChanged = this.handleNameChanged.bind(this);
    this.handleAmountChanged = this.handleAmountChanged.bind(this);
    this.handleStrengthChanged = this.handleStrengthChanged.bind(this);
    this.handleStartTimeChanged = this.handleStartTimeChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetState() {
    this.state = {name: "", amount: 0, strength: 0, startTime: new Date().getTime()};
  }

  componentDidMount() {
     this.timerID = setInterval(
      () => this.refreshStartTime(),
      1000
    );
  }

  refreshStartTime() {
    this.setState({startTime: new Date().getTime()});
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
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
    this.setState({startTime: new Date(event.target.value).getTime()});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onChange(this.state);
    this.resetState();
  }

  render() {
    let startString = new Date(this.state.startTime).toISOString().substring(0, 16);

    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' onChange={this.handleNameChanged} value={this.state.name} placeholder='Name' required />
        <input type='number' onChange={this.handleAmountChanged} value={this.state.amount} placeholder='Amount (cl)' min='0' required />
        <input type='number' onChange={this.handleStrengthChanged} value={this.state.strength} placeholder='Strength (%)' min='0' max='100' required />
        <input type='datetime-local' onChange={this.handleStartTimeChanged} required value={startString} />
        <input type='submit' />
      </form>
    );
  }
}

export default NewDrink;
