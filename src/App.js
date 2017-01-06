import React, { Component } from 'react';
import Drink from './Drink'
import Calculator from './Calculator'
import BasicData from './BasicData'
import Welcome from './Welcome'
import NewDrink from './NewDrink'

class App extends Component {
  constructor() {
    super();

    let localStorageExists = typeof(Storage) !== 'undefined';

    this.state = {
      basicData: {
        name: localStorageExists && localStorage.name ? localStorage.name : '',
        gender: localStorageExists && localStorage.gender ? localStorage.gender : 'female',
        weight: localStorageExists && localStorage.weight ? localStorage.weight : '',
      },
      drinks: localStorageExists && localStorage.drinks ? JSON.parse(localStorage.drinks) : [],
      exported: localStorageExists,
      keygen: localStorageExists && localStorage.keygen ? localStorage.keygen : 0,
      canSave: localStorageExists,
      showBasic: !(localStorageExists && localStorage.name && localStorage.gender && localStorage.weight),
    };

    this.onBasicDataChange = this.onBasicDataChange.bind(this);
    this.onNewDrinkSubmit = this.onNewDrinkSubmit.bind(this);
    this.removeDrink = this.removeDrink.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.toggleBasic = this.toggleBasic.bind(this);
    this.saveBasicData = this.saveBasicData.bind(this);
    this.saveDrinks = this.saveDrinks.bind(this);
  }

  onBasicDataChange(data) {
    this.setState({basicData: data}, this.saveBasicData);
    this.setState({showBasic: false});
  }

  onNewDrinkSubmit(data) {
    data.key = this.state.keygen;
    this.setState({keygen: this.state.keygen + 1});
    this.setState({drinks: this.state.drinks.concat([data])}, this.saveDrinks);
  }

  removeDrink(drink) {
    let tempDrinks = this.state.drinks;
    let index = tempDrinks.indexOf(drink);
    tempDrinks.splice(index, 1);
    this.setState({drinks: tempDrinks}, this.saveDrinks);
  }

  toggleBasic() {
    this.setState({showBasic: !this.state.showBasic});
  }

  toggleSave() {
    this.setState({exported: !this.state.exported}, this.saveBasicData);
  }

  saveBasicData() {
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

  saveDrinks() {
    if (this.state.canSave) {
      localStorage.drinks = JSON.stringify(this.state.drinks);
      localStorage.keygen = this.state.keygen;
    }
  }

  render() {
    let remember = this.state.canSave ? <div className='remember'><input type='checkbox' checked={this.state.exported} onChange={this.toggleSave} id='remember-box' /><label htmlFor='remember-box'>Remember my data</label></div> : <p>Your browser does not support local storage</p>;

    let basicInfo = this.state.showBasic ? <div id='basic-data'><Welcome /><BasicData name={this.state.basicData.name} gender={this.state.basicData.gender} weight={this.state.basicData.weight} onChange={this.onBasicDataChange} />{remember}</div> : this.state.basicData.name !== '' ? <div id='basic-data'><h2>Using app as {this.state.basicData.name}</h2></div> : <div id='basic-data'><h2>Set up basic data before using the app!</h2></div>;

    let toggleButton = this.state.showBasic ? <button onClick={this.toggleBasic}>Hide basic info</button> : <button onClick={this.toggleBasic}>Show basic info</button>;

    let rows = [];

    this.state.drinks.forEach(function (drink) {
      rows.push(<Drink key={drink.key} name={drink.name} amount={drink.amount} strength={drink.strength} startTime={drink.startTime} onRemove={this.removeDrink} />);
    }, this);

    return (
      <div>
        {basicInfo}
        {toggleButton}
        <NewDrink onChange={this.onNewDrinkSubmit} />
        {rows}
        <Calculator drinks={this.state.drinks} weight={this.state.basicData.weight} gender={this.state.basicData.gender} />
      </div>
    );
  }
}

export default App;
