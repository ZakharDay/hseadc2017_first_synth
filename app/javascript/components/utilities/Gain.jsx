import React from 'react'

import Slider from '../controls/Slider'

export default class Gain extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { name, gain, handleValueChange } = this.props

    return (
      <div className="Effect">
        <div className="controlsContainer">
          <div className="controlsRow">
            <h2>Gain</h2>
            <Slider
              name={name}
              property="gain"
              min="0"
              max="1"
              value={gain}
              handleValueChange={handleValueChange}
            />
          </div>
        </div>
      </div>
    )
  }
}
