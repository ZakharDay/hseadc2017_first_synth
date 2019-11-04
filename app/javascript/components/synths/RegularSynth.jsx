import _ from 'lodash'
import React from 'react'
import Tone from 'tone'

import PlaySwitch from '../controls/PlaySwitch'
import ToggleButton from '../controls/ToggleButton'
import Slider from '../controls/Slider'
import Knob from '../controls/Knob'
import ButtonSet from '../controls/ButtonSet'

export default class RegularSynth extends React.Component {
  constructor(props) {
    super(props)
    _.bindAll(this, 'handleValueChange')
  }

  handleValueChange(name, property, value) {
    const { changeSynthValue } = this.props
    changeSynthValue(name, property, value)
  }

  render() {
    const { text, synth, instrument, on, togglePlay } = this.props

    return (
      <div className="Synth">
        <ToggleButton text={text} on={on} handleClick={togglePlay} />

        <div className="controlsContainer">
          <div className="controlsRow"></div>
        </div>
      </div>
    )
  }
}
