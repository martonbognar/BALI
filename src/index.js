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

    this.state = {name: props.name, weight: props.weight, gender: props.gender};
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
    this.props.onChange(this.state);
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
        <input type='submit' />
      </form>
    );
  }
}

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

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.ebac = this.ebac.bind(this);
    this.calculateEbac = this.calculateEbac.bind(this);
  }

  calculateEbac() {
    let alcohol = 0;
    let period = ((new Date()).getTime() - this.props.drinks[0].startTime.getTime()) / (1000 * 60 * 60);
    for (let i = 0; i < this.props.drinks.length; i++) {
      let alcoholml = (parseInt(this.props.drinks[i].amount, 10) / 10) * parseInt(this.props.drinks[i].strength, 10);
      let grams = alcoholml * 0.789;
      alcohol += grams;
    }
    return this.ebac(alcohol, period).toFixed(5);
  }

  ebac(alcohol, period) {
    let bw = this.props.gender === "male" ? 0.58 : 0.49;
    let result = ((0.806 * (alcohol / 10) * 1.2) / (bw * this.props.weight)) - (0.017 * period);
    return result > 0 ? result : 0;
  }

  render() {
    let value = this.calculateEbac();

    return (
      <div>
        Alcohol: {value}
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      basicData: {
        name: "",
        gender: "female",
        weight: 0
      },
      drinks: [
        {key: 1, name: "Example drink 1", amount: 50, strength: 4.3, startTime: new Date(1483457356000), finishTime: new Date(1483458356000)},
      ],
      exported: false
    };

    this.onBasicDataChange = this.onBasicDataChange.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
  }

  onBasicDataChange(data) {
    this.setState({basicData: data});
    alert(JSON.stringify(data));
  }

  toggleSave() {
    this.setState({exported: !this.state.exported});
  }

  render() {
    const localStorageExists = typeof(Storage) !== "undefined";
    const remember = localStorageExists ? <input type='checkbox' onClick={this.toggleSave} /> : <p>Your browser does not support local storage</p>;

    let rows = [];

    this.state.drinks.forEach(function (drink) {
      rows.push(<Drink key={drink.key} name={drink.name} amount={drink.amount} strength={drink.strength} startTime={drink.startTime} finishTime={drink.finishTime} />)
    });

    return (
      <div>
        <Welcome />
        <BasicData name={this.state.basicData.name} gender={this.state.basicData.gender} weight={this.state.basicData.weight} onChange={this.onBasicDataChange} />
        {remember}
        {rows}
        <Calculator drinks={this.state.drinks} weight={this.state.basicData.weight} gender={this.state.basicData.gender} />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
