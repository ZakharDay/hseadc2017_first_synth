import _, { merge } from 'lodash'
import React from 'react'
import Tone from 'tone'
let unmuteAudio = require('unmute-ios-audio')

let bpm = 90
const defaultWetValue = 1

export default class Room3 extends React.Component {
  constructor(props) {
    super(props)

    // _.bindAll(
    //   this,
    //   ''
    // )

    this.state = {}
  }

  componentDidMount() {}

  handleStart() {
    unmuteAudio()
    Tone.Transport.bpm.value = bpm
    Tone.Transport.scheduleRepeat(this.nextMeasure, '1m')
    Tone.Transport.start()
  }

  render() {
    return <div></div>
  }
}
