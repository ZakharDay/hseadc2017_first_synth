import _ from 'lodash'
import React from 'react'

import PlaySwitch from '../PlaySwitch'
import ToggleSwitch from '../ToggleSwitch'
import Slider from '../Slider'
import Knob from '../Knob'
import ButtonSet from '../ButtonSet'

export default class AutoFilter extends React.Component {
  constructor(props) {
    super(props)
    _.bindAll(this, 'changeEffectFilterValue')
  }

  changeEffectFilterValue(effectName, filterParamName, value) {
    const { changeEffectFilterValue } = this.props
    changeEffectFilterValue(effectName, filterParamName, value)
  }

  render() {
    let set = [-12, -24, -48, -96]

    const {
      name,
      effect,
      wet,
      on,
      toggleEffect,
      changeEffectWetValue,
      changeEffectValue,
      changeEffectFilterValue
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

            <h2>Filter</h2>
            <h2>Rolloff</h2>
            <ButtonSet
              name={name}
              property="rolloff"
              set={set}
              value={effect.filter.rolloff}
              handleValueChange={this.changeEffectFilterValue}
            />
          </div>
        </div>
      </div>
    )
  }
}
