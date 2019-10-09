import React from 'react'

import PlaySwitch from '../controls/PlaySwitch'
import ToggleSwitch from '../controls/ToggleSwitch'
import Slider from '../controls/Slider'
import Knob from '../controls/Knob'
import ButtonSet from '../controls/ButtonSet'

export default class Tremolo extends React.Component {
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
        <ToggleSwitch value="Tremolo" current={on} handleClick={toggleEffect} />

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
              max="100"
              value={effect.frequency.value}
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

            <h2>Spread</h2>
            <Slider
              name={name}
              property="spread"
              min="0"
              max="180"
              on={on}
              value={effect.spread}
              handleValueChange={changeEffectValue}
            />
          </div>
        </div>
      </div>
    )
  }
}
