import React from 'react'

import PlaySwitch from '../controls/PlaySwitch'
import ToggleSwitch from '../controls/ToggleSwitch'
import Slider from '../controls/Slider'
import Knob from '../controls/Knob'
import ButtonSet from '../controls/ButtonSet'

export default class AutoFilter extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const typeSet = ['sine', 'square', 'triangle', 'sawtooth']
    const filterTypeSet = ['lowpass', 'highpass']
    const rolloffSet = [-12, -24, -48, -96]

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
        <ToggleSwitch
          value="Auto Filter"
          current={on}
          handleClick={toggleEffect}
        />

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
              set={typeSet}
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

            <h2>Base Frequency</h2>
            <Slider
              name={name}
              property="baseFrequency.value"
              min="0"
              max="1000"
              value={effect.baseFrequency.value}
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

            <h2>Filter</h2>
            <h2>Type</h2>
            <ButtonSet
              name={name}
              property="filter.type"
              set={filterTypeSet}
              value={effect.filter.type}
              handleValueChange={changeEffectValue}
            />

            <h2>Rolloff</h2>
            <ButtonSet
              name={name}
              property="filter.rolloff"
              set={rolloffSet}
              value={effect.filter.rolloff}
              handleValueChange={changeEffectValue}
            />

            <h2>Q</h2>
            <Slider
              name={name}
              property="filter.q"
              min="0"
              max="10"
              on={on}
              value={effect.filter.q}
              handleValueChange={changeEffectValue}
            />
          </div>
        </div>
      </div>
    )
  }
}
