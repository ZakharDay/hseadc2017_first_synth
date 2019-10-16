import React from 'react'

import Slider from '../controls/Slider'

export default class Speed extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      bpm,
      changeBpmValue
    } = this.props

    return (
      <div className="Effect">
        <div className="controlsContainer">
          <div className="controlsRow">
            <h2>BPM {bpm}</h2>
            <Slider
              name="Bpm"
              property="bpm"
              min="1"
              max="200"
              value={bpm}
              handleValueChange={changeBpmValue}
            />
          </div>
        </div>
      </div>
    )
  }
}
