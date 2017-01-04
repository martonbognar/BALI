import React, { Component } from 'react';
import Drink from './Drink'
import Calculator from './Calculator'
import BasicData from './BasicData'
import Welcome from './Welcome'
import NewDrink from './NewDrink'

class App extends Component {
  constructor() {
    super();

    this.state = {
      basicData: {
        name: "",
        gender: "female",
        weight: 0
      },
      drinks: [],
      exported: false,
      keygen: 0
    };

    this.onBasicDataChange = this.onBasicDataChange.bind(this);
    this.onNewDrinkSubmit = this.onNewDrinkSubmit.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
  }

  onBasicDataChange(data) {
    this.setState({basicData: data});
  }

  onNewDrinkSubmit(data) {
    data.key = this.state.keygen;
    let tempDrinks = this.state.drinks;
    tempDrinks.push(data);
    this.setState({keygen: this.state.keygen + 1});
    this.setState({drinks: tempDrinks});
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
        <NewDrink onChange={this.onNewDrinkSubmit} />
        {rows}
        <Calculator drinks={this.state.drinks} weight={this.state.basicData.weight} gender={this.state.basicData.gender} />
      </div>
    );
  }
}

export default App;
