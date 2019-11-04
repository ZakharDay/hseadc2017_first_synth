import _ from 'lodash'
import React from 'react'
import Tone from 'tone'

import PlaySwitch from '../controls/PlaySwitch'
import ToggleButton from '../controls/ToggleButton'
import Slider from '../controls/Slider'
import Knob from '../controls/Knob'
import ButtonSet from '../controls/ButtonSet'

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
    const typeSet = ['sine', 'square', 'triangle', 'sawtooth', 'fatsawtooth']
    // prettier-ignore
    const curveSet = ['linear', 'exponential', 'sine', 'cosine', 'bounce', 'ripple', 'step']
    const { text, synth, instrument, on, togglePlay } = this.props
    console.log(synth, instrument)

    const {
      type,
      count,
      spread,
      phase,
      fadeIn
    } = instrument.voices[0].oscillator

    console.log(type, count, spread)

    const {
      attack,
      decay,
      sustain,
      release,
      attackCurve
    } = instrument.voices[0].envelope

    return (
      <div className="Synth">
        <ToggleButton text={text} on={on} handleClick={togglePlay} />

        <div className="controlsContainer">
          <div className="controlsRow">
            <h2>Oscillator</h2>

            <h2>Type</h2>
            <ButtonSet
              name={name}
              property="oscillator.type"
              set={typeSet}
              value={type}
              handleValueChange={this.handleValueChange}
            />

            <h2>Count</h2>
            <Slider
              name={synth}
              property="oscillator.count"
              min="0"
              max="10"
              value={count}
              handleValueChange={this.handleValueChange}
            />

            <h2>Spread</h2>
            <Slider
              name={synth}
              property="oscillator.spread"
              min="0"
              max="100"
              value={spread}
              handleValueChange={this.handleValueChange}
            />

            <h2>Phase</h2>
            <Slider
              name={synth}
              property="oscillator.phase"
              min="0"
              max="10"
              value={phase}
              handleValueChange={this.handleValueChange}
            />

            <h2>Fade In</h2>
            <Slider
              name={synth}
              property="oscillator.fadeIn"
              min="0"
              max="10"
              value={fadeIn}
              handleValueChange={this.handleValueChange}
            />

            <h2>Envelope</h2>

            <h2>Attack</h2>
            <Slider
              name={synth}
              property="envelope.attack"
              min="0"
              max="1"
              value={attack}
              handleValueChange={this.handleValueChange}
            />

            <h2>Decay</h2>
            <Slider
              name={synth}
              property="envelope.decay"
              min="0"
              max="1"
              value={decay}
              handleValueChange={this.handleValueChange}
            />

            <h2>Sustain</h2>
            <Slider
              name={synth}
              property="envelope.sustain"
              min="0"
              max="1"
              value={sustain}
              handleValueChange={this.handleValueChange}
            />

            <h2>Release</h2>
            <Slider
              name={synth}
              property="envelope.release"
              min="0"
              max="10"
              value={release}
              handleValueChange={this.handleValueChange}
            />

            <h2>Attack Curve</h2>
            <ButtonSet
              name={name}
              property="envelope.attackCurve"
              set={curveSet}
              value={attackCurve}
              handleValueChange={this.handleValueChange}
            />
          </div>
        </div>
      </div>
    )
  }
}
