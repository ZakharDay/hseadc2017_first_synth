import _, { merge } from 'lodash'
import React from 'react'
import Tone from 'tone'
let unmuteAudio = require('unmute-ios-audio')

import * as synths from '../utilities/synths'

import Synth from '../components/synths/Synth'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, 'addSynth', 'renderSynths')

    this.state = {}
  }

  addSynth() {
    let synth = synths.toneSynth()
    synth.toMaster()
    this.setState(synth)
  }

  renderSynths() {
    let synths = []

    this.state.map((synth, i) => {
      synths.push(<Synth {...synth} key={i} />)
    })

    return synths
  }

  render() {
    return (
      <div>
        <div onClick={this.addSynth()}></div>
        {this.renderSynths()}
      </div>
    )
  }
}
