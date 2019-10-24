import _, { merge } from 'lodash'
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

import Drum from '../components/synths/Drum'

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

// let drumLoop1Kick
// let drumLoop1Snare
// let drumLoop1Hat

let drumLoop1Kick = drumLoops.kick1(kickDrum)
let drumLoop1Snare = drumLoops.snare1(snareHit, snareMembrane)
let drumLoop1Hat = drumLoops.hat1(highhat)

let drumLoop2Kick = drumLoops.kick2(kickDrum)
let drumLoop2Snare = drumLoops.snare2(snareHit, snareMembrane)
let drumLoop2Hat = drumLoops.hat2(highhat)

let drumLoop3Kick = drumLoops.kick3(kickDrum)
let drumLoop3Hat = drumLoops.hat3(highhat)

// intro
let lightSynth = lightSynthTunes.polySynth()
let lightSynthFilter = lightSynthTunes.autoFilter()
let lightSynthReverb = lightSynthTunes.jcReverb()
let lightSynthChorus = lightSynthTunes.chorus().toMaster()
let lightSynthPart = lightSynthTunes.introPart(lightSynth)
lightSynth.chain(lightSynthFilter, lightSynthReverb, lightSynthChorus)

// bass
let bassSynth = bassSynthTunes.bass()
let bassSynthDistortion = bassSynthTunes.distortion().toMaster()
let bassSynthFilter = bassSynthTunes.autoFilter()
let bassSynthPart = bassSynthTunes.part(bassSynth)
bassSynth.chain(bassSynthFilter, bassSynthDistortion)

let soloSynth = soloSynthTunes.toneSynth() //.toMaster()
let soloSynthChorus = soloSynthTunes.chorus()
let soloSynthReverb = soloSynthTunes.jcReverb() //.toMaster()
let soloSynthFilter = soloSynthTunes.autoFilter().toMaster()
let soloSynthPart = soloSynthTunes.part(soloSynth)
soloSynth.chain(soloSynthChorus, soloSynthReverb, soloSynthFilter)

let highSynth = highSynthTunes.metalSynth() //.toMaster()
let highSynthTremolo = highSynthTunes.tremolo()
let highSynthVibrato = highSynthTunes.vibrato()
let highSynthDistortion = highSynthTunes.distortion().toMaster()
let highSynthPart = highSynthTunes.part(highSynth)
highSynth.chain(highSynthTremolo, highSynthVibrato, highSynthDistortion)

export default class Performance extends React.Component {
  constructor(props) {
    super(props)

    this.kickCircle = React.createRef()
    this.snareCircle = React.createRef()

    _.bindAll(
      this,
      'handleKeydown',
      'setupDrums',
      'toggleDrum',
      'changeDrumLoop'
    )

    // drumLoop1Kick = drumLoops.kick1(kickDrum, this.hitKickDrumCircle)
    // // prettier-ignore
    // drumLoop1Snare = drumLoops.snare1(snareHit, snareMembrane, this.hitSnareDrumCircle)
    // drumLoop1Hat = drumLoops.snare3(highhat)

    this.state = {
      drums: {
        kick: {
          part: 0,
          on: false,
          volume: 10,
          parts: [drumLoop1Kick, drumLoop2Kick, drumLoop3Kick]
        },
        snare: {
          part: 0,
          on: false,
          volume: 10,
          parts: [drumLoop1Snare, drumLoop2Snare]
        },
        hat: {
          part: 0,
          on: false,
          volume: 10,
          parts: [drumLoop1Hat, drumLoop2Hat, drumLoop3Hat]
        }
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown)
  }

  nextMeasure() {
    console.log('next measure')
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

        this.state.drums.kick.parts.map(part => {
          part.mute = true
          part.start()
        })

        this.state.drums.snare.parts.map(part => {
          part.mute = true
          part.start()
        })

        this.state.drums.hat.parts.map(part => {
          part.mute = true
          part.start()
        })

        bassSynthPart.mute = true
        soloSynthPart.mute = true
        highSynthPart.mute = true

        lightSynthPart.start()
        bassSynthPart.start()
        soloSynthPart.start()
        highSynthPart.start()

        this.setupDrums('kick')
        this.setupDrums('snare')
        this.setupDrums('hat')

        // this.state.drums.kick
        //
        // let { part, on, parts } = this.state.drums
        //
        // if (on == true) {
        //   parts.map((p, i) => {
        //     if (i == part) {
        //       p.mute = false
        //     } else {
        //       p.mute = true
        //     }
        //
        //     p.start()
        //   })
        // }
        break
      case 49:
        lightSynthPart.mute = !lightSynthPart.mute
        break
      case 50:
        bassSynthPart.mute = !bassSynthPart.mute
        break
      case 51:
        this.toggleDrum('kick')
        break
      case 52:
        this.toggleDrum('snare')
        break
      case 53:
        this.toggleDrum('hat')
        break
      case 54:
        soloSynthPart.mute = !soloSynthPart.mute
        break
      case 55:
        highSynthPart.mute = !highSynthPart.mute
        break
    }
  }

  setupDrums(drumName) {
    let { part, on, parts } = this.state.drums[drumName]

    if (on == true) {
      parts.map((p, i) => {
        if (i == part) {
          p.mute = false
        } else {
          p.mute = true
        }

        p.start()
      })
    }
  }

  toggleDrum(drumName) {
    let { drums } = this.state
    let { part, on, volume, parts } = drums[drumName]

    parts.map((p, i) => {
      if (on == true) {
        p.mute = true
      } else {
        p.mute = false
      }
    })

    drums[drumName]['part'] = part
    drums[drumName]['on'] = !on
    drums[drumName]['volume'] = volume
    drums[drumName]['parts'] = parts

    merge({}, this.state.drums, drums)

    this.setState({
      drums
    })
  }

  changeDrumLoop(drumName, partNumber) {
    let { drums } = this.state
    let { part, on, volume, parts } = drums[drumName]

    parts.map((p, i) => {
      console.log(i, partNumber)
      if (i == partNumber) {
        if (on == true) {
          p.mute = false
        }
      } else {
        p.mute = true
      }
    })

    drums[drumName]['part'] = partNumber
    drums[drumName]['on'] = on
    drums[drumName]['volume'] = volume
    drums[drumName]['parts'] = parts

    merge({}, this.state.drums, drums)

    this.setState({
      drums
    })
  }

  render() {
    return (
      <div>
        <Drum
          name="kick"
          on={this.state.drums.kick.on}
          part={this.state.drums.kick.part}
          parts={this.state.drums.kick.parts}
          toggleDrum={this.toggleDrum}
          changeDrumLoop={this.changeDrumLoop}
        />

        <Drum
          name="snare"
          on={this.state.drums.snare.on}
          part={this.state.drums.snare.part}
          parts={this.state.drums.snare.parts}
          toggleDrum={this.toggleDrum}
          changeDrumLoop={this.changeDrumLoop}
        />

        <Drum
          name="hat"
          on={this.state.drums.hat.on}
          part={this.state.drums.hat.part}
          parts={this.state.drums.hat.parts}
          toggleDrum={this.toggleDrum}
          changeDrumLoop={this.changeDrumLoop}
        />
      </div>
    )
  }
}
