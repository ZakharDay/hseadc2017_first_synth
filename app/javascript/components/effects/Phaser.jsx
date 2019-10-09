import React from 'react'

import PlaySwitch from '../controls/PlaySwitch'
import ToggleSwitch from '../controls/ToggleSwitch'
import Slider from '../controls/Slider'
import Knob from '../controls/Knob'
import ButtonSet from '../controls/ButtonSet'

export default class Phaser extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
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
        <ToggleSwitch value="Phaser" current={on} handleClick={toggleEffect} />

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

            <h2>Frequency</h2>
            <Slider
              name={name}
              property="frequency.value"
              min="0"
              max="1"
              value={effect.frequency.value}
              handleValueChange={changeEffectValue}
            />

            <h2>Octaves</h2>
            <Slider
              name={name}
              property="octaves.value"
              min="0"
              max="6"
              on={on}
              value={effect.octaves.value}
              handleValueChange={changeEffectValue}
            />

            <h2>Stages</h2>
            <Slider
              name={name}
              property="stages"
              min="0"
              max="10"
              on={on}
              value={effect.stages}
              handleValueChange={changeEffectValue}
            />

            <h2>Q</h2>
            <Slider
              name={name}
              property="q"
              min="0"
              max="10"
              on={on}
              value={effect.q}
              handleValueChange={changeEffectValue}
            />

            <h2>Base Frequency</h2>
            <Slider
              name={name}
              property="baseFrequency.value"
              min="0"
              max="1000"
              on={on}
              value={effect.baseFrequency.value}
              handleValueChange={changeEffectValue}
            />
          </div>
        </div>
      </div>
    )
  }
}
