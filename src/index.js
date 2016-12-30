import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Welcome extends Component {
  render() {
    return (
      <div className="welcome-div">
        <h1>Hi!</h1>
        <p>Welcome to BALI, the <a href='https://github.com/martonbognar/bali' target='_blank'>open-source</a> Blood Alcohol Level Indicator.</p>
        <p>Please enter your basic information and remember to drink responsibly. Never drink and drive and don't take the estimated figures on this website too seriously.</p>
      </div>
    );
  }
}

class BasicData extends Component {
  constructor(props) {
    super(props);

    this.state = {name: '', weight: 0, gender: 'female', exported: false};
    this.changeName = this.changeName.bind(this);
    this.changeGender = this.changeGender.bind(this);
    this.changeWeight = this.changeWeight.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeName(event) {
    this.setState({name: event.target.value});
  }

  changeGender(event) {
    this.setState({gender: event.target.value});
  }

  changeWeight(event) {
    this.setState({weight: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' placeholder='Name' required value={this.state.name} onChange={this.changeName} />
        <select value={this.state.gender} onChange={this.changeGender}>
          <option value='female'>Female</option>
          <option value='male'>Male</option>
        </select>
        <input type='number' min='0' placeholder='Weight (kg)' step='0.01' required value={this.state.weight} onChange={this.changeWeight} />
      </form>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Welcome />
        <BasicData />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
