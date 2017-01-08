import React, { Component } from 'react';

class Drink extends Component {
  constructor(props) {
    super(props);

    this.state = {timeText: this.intervalToText(this.props.startTime)}

    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
     this.timerID = setInterval(
      () => this.setState({timeText: this.intervalToText(this.props.startTime)}),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  intervalToText(timestamp) {
    let diff = ((new Date()).getTime() - (new Date(timestamp)).getTime()) / 1000;

    if (diff < 10) {
      return 'just now';
    } else if (diff < 60) {
      return parseInt(diff, 10) + ' seconds ago';
    } else if (diff < 120) {
      return 'a minute ago';
    } else if (diff < 60 * 60) {
      return parseInt(diff / 60, 10) + ' minutes ago';
    } else if (diff < 60 * 60 * 2) {
      return 'an hour ago';
    } else if (diff < 60 * 60 * 24) {
      return parseInt(diff / (60 * 60), 10) + ' hours ago';
    } else if (diff < 2 * 60 * 60 * 24) {
      return 'a day ago';
    } else {
      return parseInt(diff / (60 * 60 * 24), 10) + ' days ago';
    }
  }

  remove() {
    this.props.onRemove(this);
  }

  render() {
    return (
      <div className='drink'>
        <h3>{this.props.name}</h3>
        <ul>
          <li>{this.props.amount} cl</li>
          <li>{this.props.strength}%</li>
          <li>{this.state.timeText}</li>
        </ul>
        <button onClick={this.remove} className='remove'>Remove</button>
      </div>
    );
  }
}

export default Drink;
