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
      showBasic: !(localStorageExists && localStorage.name && localStorage.gender && localStorage.weight),
    };

    this.onBasicDataChange = this.onBasicDataChange.bind(this);
    this.onNewDrinkSubmit = this.onNewDrinkSubmit.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.toggleBasic = this.toggleBasic.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  onBasicDataChange(data) {
    this.setState({basicData: data}, this.saveData);
    this.setState({showBasic: false});
  }

  onNewDrinkSubmit(data) {
    data.key = this.state.keygen;
    this.setState({keygen: this.state.keygen + 1});
    this.setState({drinks: this.state.drinks.concat([data])});
  }

  toggleBasic() {
    this.setState({showBasic: !this.state.showBasic});
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
    let remember = this.state.canSave ? <div className='remember'><input type='checkbox' checked={this.state.exported} onChange={this.toggleSave} id='remember-box' /><label htmlFor='remember-box'>Remember my data</label></div> : <p>Your browser does not support local storage</p>;

    let basicInfo = this.state.showBasic ? <div id='basic-data'><Welcome /><BasicData name={this.state.basicData.name} gender={this.state.basicData.gender} weight={this.state.basicData.weight} onChange={this.onBasicDataChange} />{remember}</div> : <div id='basic-data'>Using app as {this.state.basicData.name}</div>;

    let toggleButton = this.state.showBasic ? <button onClick={this.toggleBasic}>Hide basic info</button> : <button onClick={this.toggleBasic}>Show basic info</button>;

    let rows = [];

    this.state.drinks.forEach(function (drink) {
      rows.push(<Drink key={drink.key} name={drink.name} amount={drink.amount} strength={drink.strength} startTime={drink.startTime} />);
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
