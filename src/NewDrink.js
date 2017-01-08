import React, { Component } from 'react';

class NewDrink extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', amount: '', strength: '', startTime: new Date().getTime()};

    this.resetState = this.resetState.bind(this);
    this.refreshStartTime = this.refreshStartTime.bind(this);
    this.handleNameChanged = this.handleNameChanged.bind(this);
    this.handleAmountChanged = this.handleAmountChanged.bind(this);
    this.handleStrengthChanged = this.handleStrengthChanged.bind(this);
    this.handleStartTimeChanged = this.handleStartTimeChanged.bind(this);
    this.submitData = this.submitData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetState() {
    this.setState({name: '', amount: '', strength: '', startTime: new Date().getTime()});
  }

  refreshStartTime(event) {
    event.preventDefault();
    this.setState({startTime: new Date().getTime()});
  }

  handleNameChanged(event) {
    this.setState({name: event.target.value});
  }

  handleAmountChanged(event) {
    let input = event.target.value.replace(',', '.');
    if (isNaN(input)) {
      this.setState({amount: ''});
    } else {
      this.setState({amount: input});
    }
  }

  handleStrengthChanged(event) {
    let input = event.target.value.replace(',', '.');
    if (isNaN(input)) {
      this.setState({strength: ''});
    } else {
      this.setState({strength: input});
    }
  }

  handleStartTimeChanged(event) {
    this.setState({startTime: new Date(event.target.value).getTime()});
  }

  submitData() {
    this.props.onChange(this.state);
    this.resetState();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({amount: parseFloat(this.state.amount), strength: parseFloat(this.state.strength)}, this.submitData);
  }

  render() {
    let startTime = new Date(this.state.startTime);
    let startString = startTime.getFullYear() + '-' + ('0' + (startTime.getMonth() + 1)).slice(-2) + '-' + ('0' + startTime.getDate()).slice(-2) + 'T' + ('0' + startTime.getHours()).slice(-2) + ':' + ('0' + startTime.getMinutes()).slice(-2);

    return (
      <form onSubmit={this.handleSubmit} id='new-drink'>
        <input type='text' onChange={this.handleNameChanged} value={this.state.name} placeholder='Drink Name' required />
        <br />
        <input type='text' onChange={this.handleAmountChanged} value={this.state.amount} placeholder='Amount (cl)' required />
        <br />
        <input type='text' onChange={this.handleStrengthChanged} value={this.state.strength} placeholder='Strength (%)' required />
        <br />
        <input type='datetime-local' onChange={this.handleStartTimeChanged} required value={startString} />
        <br />
        <a href='#' onClick={this.refreshStartTime}>Set to now</a>
        <br />
        <input type='submit' />
      </form>
    );
  }
}

export default NewDrink;
