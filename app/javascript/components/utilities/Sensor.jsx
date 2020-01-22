import React from 'react'

import Slider from '../controls/Slider'

export default class Sensor extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { sensor, changeSensorValue } = this.props
    let sensorRound = Math.round(sensor)

    return (
      <div className="Effect">
        <div className="controlsContainer">
          <div className="controlsRow">
            <h2>Sensor {sensorRound}</h2>
            <Slider
              name="sensor"
              property="sensor"
              min="0"
              max="1200"
              value={sensorRound}
              handleValueChange={changeSensorValue}
            />
          </div>
        </div>
      </div>
    )
  }
}
