import React, { Component } from 'react';

class Effects extends Component {
  constructor(props) {
    super(props);

    this.state = {description:
      [
        {
          percentageFloor: 0.0001,
          percentageCeiling: 0.03,
          behavior: [
            "Average individual appears normal",
          ],
          impairment: [
            "Subtle effects that can be detected with special tests",
          ],
        },
        {
          percentageFloor: 0.03,
          percentageCeiling: 0.06,
          behavior: [
            "Mild euphoria",
            "Relaxation",
            "Joyousness",
            "Talkativeness",
            "Decreased inhibition",
          ],
          impairment: [
            "Concentration",
          ],
        },
        {
          percentageFloor: 0.06,
          percentageCeiling: 0.1,
          behavior: [
            "Blunted feelings",
            "Reduced sensitivity to pain",
            "Euphoria",
            "Disinhibition",
            "Extroversion",
          ],
          impairment: [
            "Reasoning",
            "Depth perception",
            "Peripheral vision",
            "Glare recovery",
          ],
        },
        {
          percentageFloor: 0.1,
          percentageCeiling: 0.2,
          behavior: [
            "Over-expression",
            "Boisterousness",
            "Possibility of nausea and vomiting",
          ],
          impairment: [
            "Reflexes",
            "Reaction time",
            "Gross motor control",
            "Staggering",
            "Slurred speech",
            "Temporary erectile dysfunction",
          ],
        },
        {
          percentageFloor: 0.2,
          percentageCeiling: 0.3,
          behavior: [
            "Nausea",
            "Vomiting",
            "Emotional swings",
            "Anger or sadness",
            "Partial loss of understanding",
            "Impaired sensations",
            "Decreased libido",
            "Possibility of stupor",
          ],
          impairment: [
            "Severe motor impairment",
            "Loss of consciousness",
            "Memory blackout",
          ],
        },
        {
          percentageFloor: 0.3,
          percentageCeiling: 0.4,
          behavior: [
            "Stupor",
            "Central nervous system depression",
            "Loss of understanding",
            "Lapses in and out of consciousness",
            "Low possibility of death",
          ],
          impairment: [
            "Bladder function",
            "Breathing",
            "Dysequilibrium",
            "Heart rate",
          ],
        },
        {
          percentageFloor: 0.4,
          percentageCeiling: 1,
          behavior: [
            "Severe central nervous system depression",
            "Coma",
            "Possibility of death",
          ],
          impairment: [
            "Breathing",
            "Heart rate",
            "Positional alcohol nystagmus",
          ],
        },
      ],
      hideAll: true,
    };
  }

  render() {
    let stage = null;

    this.state.description.forEach(function (obj) {
      if (this.props.percentage >= obj.percentageFloor && this.props.percentage < obj.percentageCeiling) {
        stage = obj;
      }
    }, this);

    if (stage === null) {
      return (<ul></ul>);
    }

    let behaviorList = [];
    stage.behavior.forEach(function (string) {
      behaviorList.push(<li>{string}</li>);
    });

    let impairmentList = [];
    stage.impairment.forEach(function (string) {
      impairmentList.push(<li>{string}</li>);
    });

    return (
      <div id='effects'>
        <div id='behavior'>
          <h3>Effects in behavior</h3>
          <ul>
            {behaviorList}
          </ul>
        </div>
        <div id='impairment'>
          <h3>Impairment</h3>
          <ul>
            {impairmentList}
          </ul>
        </div>
      </div>
    );
  }
}

export default Effects;
