import _ from 'lodash'
import React from 'react'
import Tone from 'tone'

import * as drums from '../tunes/drums'
import * as drumLoops from '../tunes/drum-loops'
import * as samples from '../tunes/samples'
import * as synths from '../tunes/synths'
import * as effects from '../tunes/effects'

import * as bassSynthTunes from '../tunes/p-bass-synth'
import * as highSynthTunes from '../tunes/p-high-synth'
import * as lightSynthTunes from '../tunes/p-light-synth'
import * as soloSynthTunes from '../tunes/p-solo-synth'

// import Chorus from '../components/effects/Chorus'
// import Phaser from '../components/effects/Phaser'

let bpm = 90
let kickDrum = drums.kickDrum()
let snareHit = drums.snareHit()
let highhat = drums.highhat().toMaster()
let snareMembrane = drums.snareMembrane()
let snareEQ = new Tone.EQ3(-10, 0, -10).toMaster()
let convolver = new Tone.Convolver(samples.hall).toMaster()

convolver.wet.value = 0.1
kickDrum.connect(convolver)
snareMembrane.chain(snareEQ)
snareHit.chain(snareEQ)

// let kickAnalyser = new Tone.FFT()
// let snareAnalyser = new Tone.FFT()
// kickDrum.connect(kickAnalyser)
// snareHit.connect(snareAnalyser)

let drumLoop1Kick
let drumLoop1Snare
let drumLoop1Hat

// intro
let lightSynth = lightSynthTunes.polySynth()
let lightSynthFilter = lightSynthTunes.autoFilter()
let jcReverb = lightSynthTunes.jcReverb()
let chorus = lightSynthTunes.chorus().toMaster()
let introPart = lightSynthTunes.introPart(lightSynth)
lightSynth.chain(lightSynthFilter, jcReverb, chorus)

// bass
let bassSynth = bassSynthTunes.bass()
let distortion = bassSynthTunes.distortion().toMaster()
let bassPart = bassSynthTunes.part(bassSynth)
let bassSynthFilter = bassSynthTunes.autoFilter()
bassSynth.chain(bassSynthFilter, distortion)

let soloSynth = soloSynthTunes.toneSynth() //.toMaster()
let soloPart = soloSynthTunes.part(soloSynth)
let soloSynthChorus = soloSynthTunes.chorus()
let soloSynthReverb = soloSynthTunes.jcReverb() //.toMaster()
let soloSynthFilter = soloSynthTunes.autoFilter().toMaster()
soloSynth.chain(soloSynthChorus, soloSynthReverb, soloSynthFilter)

let highSynth = highSynthTunes.metalSynth() //.toMaster()
let highPart = highSynthTunes.part(highSynth)
// let highSynthReverb = highSynthTunes.reverb() //.toMaster()
let highSynthTremolo = highSynthTunes.tremolo() //.toMaster()
let highSynthVibrato = highSynthTunes.vibrato() //.toMaster()
// let stereoWidener = highSynthTunes.stereoWidener() //.toMaster()
// let highSynthReverb = highSynthTunes.jcReverb().toMaster()
let highSynthDistortion = highSynthTunes.distortion().toMaster()

highSynth.chain(highSynthTremolo, highSynthVibrato, highSynthDistortion)

export default class Performance extends React.Component {
  constructor(props) {
    super(props)

    this.kickCircle = React.createRef()
    this.snareCircle = React.createRef()

    _.bindAll(this, 'handleKeydown', 'hitKickDrumCircle', 'hitSnareDrumCircle')

    drumLoop1Kick = drumLoops.kick1(kickDrum, this.hitKickDrumCircle)
    // prettier-ignore
    drumLoop1Snare = drumLoops.snare1(snareHit, snareMembrane, this.hitSnareDrumCircle)
    drumLoop1Hat = drumLoops.snare3(highhat)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown)
  }

  nextMeasure() {
    console.log('next measure')
  }

  hitKickDrumCircle() {
    // this.kickCircle.current.style.width = '100px'
    // console.log('kick')
    // console.log(kickAnalyser.getValue())
  }

  hitSnareDrumCircle() {
    // console.log(snareAnalyser.getValue())
  }

  handleKeydown(e) {
    console.log(e.key, e.code, e.keyCode)

    switch (e.keyCode) {
      case 70:
        console.log('f')
        snareHit.triggerAttackRelease('16n')
        snareMembrane.triggerAttackRelease('E1', '16n')
        break
      case 71:
        console.log('g')
        // highhat.triggerAttackRelease(51, '16n', 1)
        highhat.triggerAttackRelease('16n')
        break
      case 72:
        console.log('h')
        kickDrum.triggerAttackRelease('G0', '16n')
        break
      case 32:
        console.log('space')
        Tone.Transport.bpm.value = bpm
        Tone.Transport.start()
        Tone.Transport.scheduleRepeat(this.nextMeasure, '1m')

        // introPart.mute = true
        bassPart.mute = true
        drumLoop1Hat.mute = true
        drumLoop1Kick.mute = true
        drumLoop1Snare.mute = true
        soloPart.mute = true
        highPart.mute = true

        introPart.start()
        bassPart.start()
        drumLoop1Hat.start()
        drumLoop1Kick.start()
        drumLoop1Snare.start()
        soloPart.start()
        highPart.start()
        break
      case 49:
        introPart.mute = !introPart.mute
        break
      case 50:
        bassPart.mute = !bassPart.mute
        break
      case 51:
        drumLoop1Hat.mute = !drumLoop1Hat.mute
        break
      case 52:
        drumLoop1Kick.mute = !drumLoop1Kick.mute
        break
      case 53:
        drumLoop1Snare.mute = !drumLoop1Snare.mute
        break
      case 54:
        soloPart.mute = !soloPart.mute
        break
      case 55:
        highPart.mute = !highPart.mute
        break
    }
  }

  render() {
    return (
      <div>
        <div className="kick" ref={this.kickCircle} />
        <div className="snare" ref={this.snareCircle} />
      </div>
    )
  }
}
