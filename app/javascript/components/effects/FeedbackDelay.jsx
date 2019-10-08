import React from 'react'

import ToggleSwitch from '../ToggleSwitch'
import Slider from '../Slider'

export default class FeedbackDelay extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      name,
      effect,
      on,
      wet,
      toggleEffect,
      changeEffectWetValue,
      changeEffectValue
    } = this.props

    return (
      <div className="Effect">
        <ToggleSwitch value="Delay" current={on} handleClick={toggleEffect} />

        <div className="controlsContainer">
          <div className="controlsRow">
            <h2>Wet</h2>
            <Slider
              name={name}
              property="wet"
              min="0"
              max="1"
              value={wet}
              handleValueChange={changeEffectWetValue}
            />

            <h2>Max Delay</h2>
            <Slider
              name={name}
              property="maxDelay"
              min="0"
              max="100"
              value={effect.maxDelay}
              handleValueChange={changeEffectValue}
            />
          </div>
        </div>
      </div>
    )
  }
}
