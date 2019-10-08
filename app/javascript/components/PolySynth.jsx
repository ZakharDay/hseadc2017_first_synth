import _ from 'lodash'
import React from 'react'
import Tone from 'tone'

import ToggleSwitch from './ToggleSwitch'
import Slider from './Slider'

export default class PolySynth extends React.Component {
  constructor(props) {
    super(props)
    _.bindAll(this, 'handleValueChange')
  }

  handleValueChange(name, property, value) {
    const { changeSynthValue } = this.props
    changeSynthValue(name, property, value)
  }

  render() {
    const { synth, on, togglePlay } = this.props
    // const { attack, decay, sustain, release } = instrument.envelope

    return (
      <div className="Effect">
        <ToggleSwitch value="Synth" current={on} handleClick={togglePlay} />

        <div className="controlsContainer">
          <div className="controlsRow"></div>
        </div>
      </div>
    )
  }
}
