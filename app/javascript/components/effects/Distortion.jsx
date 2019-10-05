import React from 'react'

import PlaySwitch from '../PlaySwitch'
import ToggleSwitch from '../ToggleSwitch'
import Slider from '../Slider'
import Knob from '../Knob'

export default class Distortion extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let name = 'distortion'
    const {
      effect,
      wet,
      on,
      toggleEffect,
      changeEffectWetValue,
      changeDistortionValue
    } = this.props

    return (
      <div className="Effect">
        <h1>Distortion</h1>

        <div className="controlsContainer">
          <div className="controlsRow">
            <h2>Wet</h2>

            <Slider
              name={name}
              min="0"
              max="1"
              value={wet}
              handleValueChange={changeEffectWetValue}
            />
          </div>

          <div className="controlsRow">
            <h2>Distortion</h2>
            <Slider
              name={name}
              min="0"
              max="100"
              on={on}
              value={effect.distortion}
              handleValueChange={changeDistortionValue}
            />
          </div>
        </div>

        <ToggleSwitch
          value="Distortion"
          current={on}
          handleClick={toggleEffect}
        />
      </div>
    )
  }
}
