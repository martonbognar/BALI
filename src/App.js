import React, { Component } from 'react';
import Drink from './Drink'
import Calculator from './Calculator'
import BasicData from './BasicData'
import Welcome from './Welcome'
import NewDrink from './NewDrink'

class App extends Component {
  constructor() {
    super();

    let localStorageExists = typeof(Storage) !== "undefined";

    this.state = {
      basicData: {
        name: localStorageExists && localStorage.name ? localStorage.name : "",
        gender: localStorageExists && localStorage.gender ? localStorage.gender : "female",
        weight: localStorageExists && localStorage.weight ? localStorage.weight : 0
      },
      drinks: [],
      exported: localStorageExists,
      keygen: 0,
      canSave: localStorageExists,
    };

    this.onBasicDataChange = this.onBasicDataChange.bind(this);
    this.onNewDrinkSubmit = this.onNewDrinkSubmit.bind(this);
    this.onFinishedDrink = this.onFinishedDrink.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  onBasicDataChange(data) {
    this.setState({basicData: data}, this.saveData);
  }

  onNewDrinkSubmit(data) {
    data.key = this.state.keygen;
    let tempDrinks = this.state.drinks;
    tempDrinks.push(data);
    this.setState({keygen: this.state.keygen + 1});
    this.setState({drinks: tempDrinks});
  }

  onFinishedDrink(key) {
    let tempDrinks = this.state.drinks;
    tempDrinks.forEach(function (drink, index) {
      if (drink.key === key) {
        tempDrinks[index].finishTime = new Date();
      }
    });
    this.setState({drinks: tempDrinks});
  }

  toggleSave() {
    this.setState({exported: !this.state.exported}, this.saveData);
  }

  saveData() {
    if (this.state.canSave) {
      if (this.state.exported) {
        localStorage.name = this.state.basicData.name;
        localStorage.gender = this.state.basicData.gender;
        localStorage.weight = this.state.basicData.weight;
      } else {
        localStorage.removeItem('name');
        localStorage.removeItem('gender');
        localStorage.removeItem('weight');
      }
    }
  }

  render() {
    const remember = this.state.canSave ? <div className='remember'><input type='checkbox' checked={this.state.exported} onChange={this.toggleSave} id='remember-box' /><label htmlFor='remember-box'>Remember my data</label></div> : <p>Your browser does not support local storage</p>;

    let rows = [];
    alert(JSON.stringify(this.state.drinks));

    let localThis = this;

    this.state.drinks.forEach(function (drink) {
      rows.push(<Drink key={drink.key} id={drink.key} name={drink.name} amount={drink.amount} strength={drink.strength} startTime={drink.startTime} finishTime={drink.finishTime} onFinish={localThis.onFinishedDrink} />);
      alert('pushing');
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
