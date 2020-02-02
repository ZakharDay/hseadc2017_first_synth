import React from 'react'

import Slider from '../controls/Slider'

export default class Sensor extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { sensor, name, currentValue, previousValue, changeSensorValue } = this.props
    // let roundValue = Math.round(currentValue)
    let roundValue = currentValue

    return (
      <div className="Effect">
        <div className="controlsContainer">
          <div className="controlsRow">
            <h2>
              {name} {roundValue}
            </h2>
            <Slider
              min="0"
              max="1200"
              value={roundValue}
              handleValueChange={changeSensorValue}
              name="sensor"
              sensorName={name}
            />
          </div>
        </div>
      </div>
    )
  }
}
