import React from 'react'

import PlaySwitch from '../controls/PlaySwitch'
import ToggleSwitch from '../controls/ToggleSwitch'
import Slider from '../controls/Slider'
import Knob from '../controls/Knob'
import ButtonSet from '../controls/ButtonSet'

export default class Vibrato extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const set = ['sine', 'square', 'triangle', 'sawtooth']

    const {
      name,
      effect,
      wet,
      on,
      toggleEffect,
      changeEffectWetValue,
      changeEffectValue
    } = this.props

    return (
      <div className="Effect">
        <ToggleSwitch value="Vibrato" current={on} handleClick={toggleEffect} />

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
              max="1"
              value={effect.maxDelay}
              handleValueChange={changeEffectValue}
            />

            <h2>Frequency</h2>
            <Slider
              name={name}
              property="frequency.value"
              min="0"
              max="1000"
              on={on}
              value={effect.frequency.value}
              handleValueChange={changeEffectValue}
            />

            <h2>Depth</h2>
            <Slider
              name={name}
              property="depth.value"
              min="0"
              max="1"
              on={on}
              value={effect.depth.value}
              handleValueChange={changeEffectValue}
            />

            <h2>Type</h2>
            <ButtonSet
              name={name}
              property="type"
              set={set}
              value={effect.type}
              handleValueChange={changeEffectValue}
            />
          </div>
        </div>
      </div>
    )
  }
}
