import _, { merge } from 'lodash'
import React from 'react'
import Tone from 'tone'
let unmuteAudio = require('unmute-ios-audio')

import Room1 from './Room1'
import Room2 from './Room2'
import Room3 from './Room3'

let bpm = 30

// let ac = new Tone.Context()
// var ac = new AudioContext()
// var audio = new Audio()
// var o = ac.createOscillator();
// o.start();
// var dest1 = ac.createMediaStreamDestination()
// var dest2 = ac.createMediaStreamDestination()
// console.log(dest1)
// o.connect(dest);
// audio.src = URL.createObjectURL(dest.stream);
// audio.play();

export default class Master extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  handleStart() {
    unmuteAudio()
    Tone.Transport.bpm.value = bpm
    Tone.Transport.scheduleRepeat(this.nextMeasure, '1m')
    Tone.Transport.start()
  }

  render() {
    return (
      <div>
        <audio controls></audio>
        <div onClick={() => this.handleStart()}>Start Transport</div>
        <section className="space" id="root">
          <Room1 />
        </section>
      </div>
    )
  }
}

export { dest1, dest2 }
