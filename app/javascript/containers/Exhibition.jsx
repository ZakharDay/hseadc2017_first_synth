<<<<<<< HEAD
import _, { merge } from 'lodash'
import React from 'react'
import Tone from 'tone'
let unmuteAudio = require('unmute-ios-audio')

import * as drums from '../tunes/drums'
import * as drumLoops from '../tunes/drum-loops'
import * as samples from '../tunes/samples'
import * as synths from '../tunes/synths'
import * as effects from '../tunes/effects'
import * as utilities from '../tunes/utilities'

import * as bassSynthTunes from '../tunes/p-bass-synth'
import * as highSynthTunes from '../tunes/e-high-synth'
import * as lightSynthTunes from '../tunes/e-light-synth'
import * as soloSynthTunes from '../tunes/p-solo-synth'

import Channel from '../components/utilities/Channel'

import Drum from '../components/synths/Drum'
=======
import _ from 'lodash'
import 'whatwg-fetch'
import React from 'react'
import Tone from 'tone'

import * as drums from '../tunes/drums'
import * as drumLoops from '../tunes/drum-loops'
import * as effects from '../tunes/effects'
import * as parts from '../tunes/parts'
import * as bassParts from '../tunes/bass-parts'
import * as synths from '../tunes/synths'

import Speed from '../components/utilities/Speed'
import Volume from '../components/utilities/Volume'
>>>>>>> performance

import AutoFilter from '../components/effects/AutoFilter'
import AutoPanner from '../components/effects/AutoPanner'
import AutoWah from '../components/effects/AutoWah'
import BitCrusher from '../components/effects/BitCrusher'
import Chebyshev from '../components/effects/Chebyshev'
import Chorus from '../components/effects/Chorus'
import Distortion from '../components/effects/Distortion'
import FeedbackDelay from '../components/effects/FeedbackDelay'
import FeedbackEffect from '../components/effects/FeedbackEffect'
import Freeverb from '../components/effects/Freeverb'
import JcReverb from '../components/effects/JcReverb'
import Phaser from '../components/effects/Phaser'
import PingPongDelay from '../components/effects/PingPongDelay'
import PitchShift from '../components/effects/PitchShift'
import Reverb from '../components/effects/Reverb'
import StereoWidener from '../components/effects/StereoWidener'
import Tremolo from '../components/effects/Tremolo'
import Vibrato from '../components/effects/Vibrato'

import MembraneSynth from '../components/synths/MembraneSynth'
import ToneSynth from '../components/synths/ToneSynth'
import NoiseSynth from '../components/synths/NoiseSynth'
import PolySynth from '../components/synths/PolySynth'

<<<<<<< HEAD
// import Chorus from '../components/effects/Chorus'
// import Phaser from '../components/effects/Phaser'

let bpm = 20
const defaultWetValue = 1

let bassSynthChannel = utilities.channel(0)
let lightSynthChannel = utilities.channel(-4)
let soloSynthChannel = utilities.channel(-4)
let highSynthChannel = utilities.channel(-4)

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

let drumLoop4Kick = drumLoops.kick4(kickDrum)

let lightSynth = lightSynthTunes.polySynth()
let lightSynthFilter = lightSynthTunes.autoFilter()
let lightSynthReverb = lightSynthTunes.jcReverb()
let lightSynthChorus = lightSynthTunes.chorus()
let lightSynthPart = lightSynthTunes.introPart(lightSynth)

lightSynth.chain(
  lightSynthFilter,
  lightSynthReverb,
  lightSynthChorus,
  lightSynthChannel
)

let bassSynth = bassSynthTunes.bass()
let bassSynthFilter = bassSynthTunes.autoFilter()
let bassSynthDistortion = bassSynthTunes.distortion()
let bassSynthPart = bassSynthTunes.part(bassSynth)
bassSynth.chain(bassSynthFilter, bassSynthDistortion, bassSynthChannel)

let soloSynth = soloSynthTunes.toneSynth()
let soloSynthChorus = soloSynthTunes.chorus()
let soloSynthReverb = soloSynthTunes.jcReverb()
let soloSynthFilter = soloSynthTunes.autoFilter()
let soloSynthPart = soloSynthTunes.part(soloSynth)

soloSynth.chain(
  soloSynthChorus,
  soloSynthReverb,
  soloSynthFilter,
  soloSynthChannel
)

let highSynth = highSynthTunes.metalSynth()
let highSynthTremolo = highSynthTunes.tremolo()
let highSynthVibrato = highSynthTunes.vibrato()
let highSynthDistortion = highSynthTunes.distortion()
let highSynthFeedbackDelay = highSynthTunes.feedbackDelay()
let highSynthFeedbackEffect = highSynthTunes.feedbackEffect()
let highSynthFreeverb = highSynthTunes.freeverb()
let highSynthPhaser = highSynthTunes.phaser()
let highSynthPingPongDelay = highSynthTunes.pingPongDelay()
let highSynthPart = highSynthTunes.part(highSynth)

highSynth.chain(
  highSynthTremolo,
  highSynthVibrato,
  highSynthDistortion,
  highSynthFeedbackDelay,
  highSynthFeedbackEffect,
  highSynthFreeverb,
  highSynthPhaser,
  highSynthPingPongDelay,
  highSynthChannel
)

let keysOctave = 4

let keysSynth = highSynth

export default class Exhibition extends React.Component {
  constructor(props) {
    super(props)

    this.kickCircle = React.createRef()
    this.snareCircle = React.createRef()

    _.bindAll(
      this,
      'nextMeasure',
      'handleStart',
      'handleKeydown',
      'handleKeyup',
      'setupDrums',
      'toggleDrum',
      'changeDrumLoop',
      'changeSynthValue',
      'toggleEffect',
      'changeEffectWetValue',
      'changeEffectValue',
      'changeChannelValue',
      'toggleChannelValue',
      'toggleNote'
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
          parts: [drumLoop1Kick, drumLoop2Kick, drumLoop3Kick, drumLoop4Kick]
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
      },
      lightSynth,
      bassSynth,
      soloSynth,
      highSynth,
      bassSynthDistortion: {
        name: 'bassSynthDistortion',
        effect: bassSynthDistortion,
        wet: bassSynthDistortion.wet.value,
        on: true
      },
      bassSynthFilter: {
        name: 'bassSynthFilter',
        effect: bassSynthFilter,
        wet: bassSynthFilter.wet.value,
        on: true
      },
      bassSynthChannel: {
        name: 'bassSynthChannel',
        channel: bassSynthChannel,
        pan: bassSynthChannel.pan.value,
        volume: bassSynthChannel.volume.value,
        mute: false,
        solo: false
      },
      lightSynthFilter: {
        name: 'lightSynthFilter',
        effect: lightSynthFilter,
        wet: lightSynthFilter.wet.value,
        on: true
      },
      lightSynthReverb: {
        name: 'lightSynthReverb',
        effect: lightSynthReverb,
        wet: lightSynthReverb.wet.value,
        on: true
      },
      lightSynthChorus: {
        name: 'lightSynthChorus',
        effect: lightSynthChorus,
        wet: lightSynthChorus.wet.value,
        on: true
      },
      lightSynthChannel: {
        name: 'lightSynthChannel',
        channel: lightSynthChannel,
        pan: lightSynthChannel.pan.value,
        volume: lightSynthChannel.volume.value,
        mute: false,
        solo: false
      },
      soloSynthChorus: {
        name: 'soloSynthChorus',
        effect: soloSynthChorus,
        wet: soloSynthChorus.wet.value,
        on: true
      },
      soloSynthReverb: {
        name: 'soloSynthReverb',
        effect: soloSynthReverb,
        wet: soloSynthReverb.wet.value,
        on: true
      },
      soloSynthFilter: {
        name: 'soloSynthFilter',
        effect: soloSynthFilter,
        wet: soloSynthFilter.wet.value,
        on: true
      },
      soloSynthChannel: {
        name: 'soloSynthChannel',
        channel: soloSynthChannel,
        pan: soloSynthChannel.pan.value,
        volume: soloSynthChannel.volume.value,
        mute: false,
        solo: false
      },
      highSynthTremolo: {
        name: 'highSynthTremolo',
        effect: highSynthTremolo,
        wet: highSynthTremolo.wet.value,
        on: true
      },
      highSynthVibrato: {
        name: 'highSynthVibrato',
        effect: highSynthVibrato,
        wet: highSynthVibrato.wet.value,
        on: true
      },
      highSynthDistortion: {
        name: 'highSynthDistortion',
        effect: highSynthDistortion,
        wet: highSynthDistortion.wet.value,
        on: true
      },
      highSynthFeedbackDelay: {
        name: 'highSynthFeedbackDelay',
        effect: highSynthFeedbackDelay,
        wet: highSynthFeedbackDelay.wet.value,
        on: true
      },
      highSynthFeedbackEffect: {
        name: 'highSynthFeedbackEffect',
        effect: highSynthFeedbackEffect,
        wet: highSynthFeedbackEffect.wet.value,
        on: true
      },
      highSynthFreeverb: {
        name: 'highSynthFreeverb',
        effect: highSynthFreeverb,
        wet: highSynthFreeverb.wet.value,
        on: true
      },
      highSynthPhaser: {
        name: 'highSynthPhaser',
        effect: highSynthPhaser,
        wet: highSynthPhaser.wet.value,
        on: true
      },
      highSynthPingPongDelay: {
        name: 'highSynthPingPongDelay',
        effect: highSynthPingPongDelay,
        wet: highSynthPingPongDelay.wet.value,
        on: true
      },
      highSynthChannel: {
        name: 'highSynthChannel',
        channel: highSynthChannel,
        pan: highSynthChannel.pan.value,
        volume: highSynthChannel.volume.value,
        mute: false,
        solo: false
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown)
    document.addEventListener('keyup', this.handleKeyup)
  }

  nextMeasure(now) {
    const { toggleDrum, changeDrumLoop } = this
    const p = Tone.Transport.position
    const regexBefore = /([\w]+)/
    let measure = p.match(regexBefore)[1]

    switch (measure) {
      case '0':
        // start light synth
        lightSynthPart.mute = false
        break

      // case '16':
      //   // start bass synth
      //   bassSynthPart.mute = false
      //   break
      //
      // case '20':
      //   // start hat loop 1
      //   toggleDrum('hat')
      //   break
      //
      // case '24':
      //   // start kick and snare
      //   toggleDrum('kick')
      //   toggleDrum('snare')
      //   break
      //
      // case '32':
      //   // start solo synth
      //   soloSynthPart.mute = false
      //   break
      //
      // case '44':
      //   // stop solo synth
      //   soloSynthPart.mute = true
      //   // start kick loop 2
      //   changeDrumLoop('kick', 1)
      //   // start snare loop 2
      //   changeDrumLoop('snare', 1)
      //   break
      //
      // case '56':
      //   // start solo synth
      //   soloSynthPart.mute = false
      //   // start kick loop 1
      //   changeDrumLoop('kick', 0)
      //   // start snare loop 1
      //   changeDrumLoop('snare', 0)
      //   break
      //
      // case '72':
      //   // stop solo synth
      //   soloSynthPart.mute = true
      //   // start high synth
      //   highSynthPart.mute = false
      //   // start kick loop 2
      //   changeDrumLoop('kick', 1)
      //   // start snare loop 2
      //   changeDrumLoop('snare', 1)
      //   // how to make sound tuning
      //   // ???
      //   break
      //
      // case '88':
      //   // start kick loop 3
      //   changeDrumLoop('kick', 2)
      //   // start hat loop 2
      //   changeDrumLoop('hat', 1)
      //   break
      //
      // case '96':
      //   // stop kick
      //   toggleDrum('kick')
      //   // stop snare
      //   toggleDrum('snare')
      //   break
      //
      // case '98':
      //   // stop hat
      //   toggleDrum('hat')
      //   break
      //
      // case '100':
      //   // start snare loop 2
      //   changeDrumLoop('snare', 1)
      //   toggleDrum('snare')
      //   break
      //
      // case '104':
      //   // stop high synth
      //   highSynthPart.mute = true
      //   // start solo synth
      //   soloSynthPart.mute = false
      //   // start kick loop 4
      //   changeDrumLoop('kick', 3)
      //   toggleDrum('kick')
      //   // start hat loop 3
      //   changeDrumLoop('hat', 2)
      //   toggleDrum('hat')
      //   break
      //
      // case '120':
      //   // start high synth
      //   highSynthPart.mute = false
      //   // stop solo synth
      //   soloSynthPart.mute = true
      //   // stop kick
      //   toggleDrum('kick')
      //   // stop snare
      //   toggleDrum('snare')
      //   // stop hat
      //   toggleDrum('hat')
      //   break
      //
      // case '128':
      //   // stop light synth
      //   lightSynthPart.mute = true
      //   // stop high synth
      //   highSynthPart.mute = true
      //   // how to move sliders
      //   // ???
      //   break
      //
      // case '144':
      //   // start solo synth
      //   soloSynthPart.mute = false
      //   // start light synth
      //   lightSynthPart.mute = false
      //   break
      //
      // case '148':
      //   // start kick loop 4
      //   changeDrumLoop('kick', 3)
      //   toggleDrum('kick')
      //   // start snare loop 2
      //   changeDrumLoop('snare', 1)
      //   toggleDrum('snare')
      //   // start hat loop 3
      //   changeDrumLoop('hat', 2)
      //   toggleDrum('hat')
      //   break
      //
      // case '164':
      //   // start high synth
      //   highSynthPart.mute = false
      //   // stop solo synth
      //   soloSynthPart.mute = true
      //   // stop light synth
      //   lightSynthPart.mute = true
      //   // stop bass synth
      //   bassSynthPart.mute = true
      //   // stop kick
      //   toggleDrum('kick')
      //   // stop snare
      //   toggleDrum('snare')
      //   // stop hat
      //   toggleDrum('hat')
      //   break
      //
      // case '166':
      //   // start light synth
      //   lightSynthPart.mute = false
      //   break
      //
      // case '168':
      //   // stop high synth
      //   highSynthPart.mute = true
      //   // stop light synth
      //   lightSynthPart.mute = true
      //   // start hat loop 3
      //   toggleDrum('hat')
      //   break
      //
      // case '169':
      //   // stop hat
      //   toggleDrum('hat')
      //   break
    }
  }

  handleStart() {
    unmuteAudio()
    Tone.Transport.bpm.value = bpm
    Tone.Transport.scheduleRepeat(this.nextMeasure, '1m')
    Tone.Transport.start()

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

    lightSynthPart.mute = true
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
        this.handleStart()

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
      case 81:
        soloSynthPart.mute = !soloSynthPart.mute
        break
      case 87:
        highSynthPart.mute = !highSynthPart.mute
        break
      case 84:
        this.toggleNote(keysSynth, 'C' + keysOctave)
        break
      case 54:
        this.toggleNote(keysSynth, 'C#' + keysOctave)
        break
      case 89:
        // Y
        this.toggleNote(keysSynth, 'D' + keysOctave)
        break
      case 55:
        this.toggleNote(keysSynth, 'D#' + keysOctave)
        break
      case 85:
        // U
        this.toggleNote(keysSynth, 'E' + keysOctave)
        break
      // case 56:
      // this.toggleNote('E3')
      // break
      case 73:
        this.toggleNote(keysSynth, 'F' + keysOctave)
        break
      case 57:
        this.toggleNote(keysSynth, 'F#' + keysOctave)
        break
      case 79:
        // O
        this.toggleNote(keysSynth, 'G' + keysOctave)
        break
      case 48:
        this.toggleNote(keysSynth, 'G#' + keysOctave)
        break
      case 80:
        this.toggleNote(keysSynth, 'A' + keysOctave)
        break
      case 173:
        this.toggleNote(keysSynth, 'A#' + keysOctave)
        break
      case 219:
        // [
        this.toggleNote(keysSynth, 'B' + keysOctave)
        break
      // case 61:
      case 221:
        this.toggleNote(keysSynth, 'C' + (keysOctave + 1))
        break
    }
  }

  handleKeyup() {
    this.stopNote(keysSynth)
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
=======
let master = Tone.Master

const defaultWetValue = 0.8

let kickDrum = drums.kickDrum()
let kickAutoFilter = effects.autoFilter()
let kickFreeverb = effects.freeverb()
let kickChebyshev = effects.chebyshev()

let snareHit = drums.snareHit()
let snareDrum = drums.snareDrum()
let snareMembrane = drums.snareMembrane()

let highHat = drums.snareHit().toMaster()

// let snareAutoFilter = effects.autoFilter()
let snareAutoFilter = new Tone.AutoFilter({
  frequency: 10,
  type: 'sine',
  depth: 1,
  baseFrequency: 500,
  octaves: 2.6,
  filter: {
    type: 'highpass',
    rolloff: -12,
    Q: 1
  }
})

let snareFreeverb = new Tone.Freeverb(0.75, 100)
let snareEQ = new Tone.EQ3(-10, 0, -10)

let snarePitchShift = new Tone.PitchShift({
  pitch: 9.2,
  windowSize: 0.01,
  delayTime: 0,
  feedback: 0.25
})

let bassSynth = synths.polySynth()
let bassFreeverb = effects.freeverb()
let bassPhaser = effects.phaser()

// let ambientSynth = synths.toneSynth()
// let ambientAutoFilter = effects.autoFilter()
// let ambientChorus = effects.chorus()
// let ambientDistortion = effects.distortion()
// let ambientFeedbackDelay = effects.feedbackDelay()
// let ambientFreeverb = effects.freeverb()
// let ambientPhaser = effects.phaser()
// let ambientPingPongDelay = effects.pingPongDelay()

// let leadSynth = synths.polySynth()
// let leadAutoPanner = effects.autoPanner()
// let leadAutoWah = effects.autoWah()
// let leadBitCrusher = effects.bitCrusher()
// let leadChebyshev = effects.chebyshev()
// let leadDistortion = effects.distortion()
// let leadFeedbackEffect = effects.feedbackEffect()
// let leadJcReverb = effects.jcReverb()
// let leadPitchShift = effects.pitchShift()
// let leadReverb = effects.reverb()
// let leadStereoWidener = effects.stereoWidener()
// let leadTremolo = effects.tremolo()
// let leadVibrato = effects.vibrato()

// let loop1 = new Tone.Loop(function(time) {
//   ambientSynth.triggerAttackRelease('C2', '8n', time)
// }, '4n')
//
// let loop3 = new Tone.Loop(function(time) {
//   leadSynth.triggerAttackRelease('C4', '1m', time)
// }, '1m')
//
// let loop4 = new Tone.Loop(function(time) {
//   ambientSynth.triggerAttackRelease('C4', '1m', time)
// }, '1m')
//
// let loop5 = new Tone.Loop(function(time) {
//   kickDrum.triggerAttackRelease('G0', '16n', time)
// }, '4n')

kickDrum.chain(kickAutoFilter, kickFreeverb, kickChebyshev, Tone.Master)

snareDrum.chain(
  snarePitchShift,
  snareEQ,
  // snareFreeverb,
  // smtng
  master
)

snareDrum.chain(
  snarePitchShift,
  snareAutoFilter,
  snareEQ,
  // snareFreeverb,
  //
  master
)

snareMembrane.chain(snareEQ)
snareHit.chain(snareEQ)
snareDrum.connect(snareFreeverb)

bassSynth.chain(bassFreeverb, bassPhaser, master)

// ambientSynth.chain(
//   ambientAutoFilter,
//   ambientChorus,
//   ambientDistortion,
//   ambientFeedbackDelay,
//   ambientFreeverb,
//   ambientPhaser,
//   ambientPingPongDelay,
//   master
// )
// ambientPingPongDelay.toMaster()

// leadSynth.chain(
//   leadAutoPanner,
//   leadAutoWah,
//   leadBitCrusher,
//   leadChebyshev,
//   leadDistortion,
//   leadFeedbackEffect,
//   leadJcReverb,
//   leadPitchShift,
//   leadReverb,
//   leadStereoWidener,
//   leadTremolo,
//   leadVibrato,
//   master
// )

// let distortion = effects.distortion()

let bassPart1 = bassParts.part1(bassSynth)
// bassPart1.mute = true
// bassPart1.start()

let drumLoop1Kick = drumLoops.kick1(kickDrum)
// drumLoop1Kick.mute = true
// drumLoop1Kick.start()

let drumLoop1Snare = drumLoops.snare1(snareHit, snareDrum, snareMembrane)
// drumLoop1Snare.mute = true
// drumLoop1Snare.start()

// let drumLoop2Kick = drumLoops.kick2(kickDrum)
// drumLoop2Kick.mute = true
// drumLoop2Kick.start()

// let drumLoop2Snare = drumLoops.snare2(snareHit, snareDrum, snareMembrane)
// drumLoop2Snare.mute = true
// drumLoop2Snare.start()

let drumLoop3Snare = drumLoops.snare3(highHat)
// drumLoop3Snare.mute = true
// drumLoop3Snare.start()

export default class Synth extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      highHat,
      kickDrum,
      kickAutoFilter: {
        name: 'kickAutoFilter',
        effect: kickAutoFilter,
        wet: defaultWetValue,
        on: false
      },
      kickFreeverb: {
        name: 'kickFreeverb',
        effect: kickFreeverb,
        wet: defaultWetValue,
        on: false
      },
      kickChebyshev: {
        name: 'kickChebyshev',
        effect: kickChebyshev,
        wet: defaultWetValue,
        on: false
      },
      snareDrum,
      snareAutoFilter: {
        name: 'snareAutoFilter',
        effect: snareAutoFilter,
        wet: defaultWetValue,
        on: false
      },
      snarePitchShift: {
        name: 'snarePitchShift',
        effect: snarePitchShift,
        wet: defaultWetValue,
        on: false
      },
      snareEQ: {
        name: 'snareEQ',
        effect: snareEQ,
        wet: defaultWetValue,
        on: false
      },
      snareFreeverb: {
        name: 'snareFreeverb',
        effect: snareFreeverb,
        wet: defaultWetValue,
        on: false
      },
      bassSynth,
      bassFreeverb: {
        name: 'bassFreeverb',
        effect: bassFreeverb,
        wet: defaultWetValue,
        on: false
      },
      bassPhaser: {
        name: 'bassPhaser',
        effect: bassPhaser,
        wet: defaultWetValue,
        on: false
      },
      bassPart1: {
        part: bassPart1,
        on: false
      },
      // ambientSynth,
      // ambientAutoFilter: {
      //   name: 'ambientAutoFilter',
      //   effect: ambientAutoFilter,
      //   wet: defaultWetValue,
      //   on: false
      // },
      // ambientChorus: {
      //   name: 'ambientChorus',
      //   effect: ambientChorus,
      //   wet: defaultWetValue,
      //   on: false
      // },
      // ambientDistortion: {
      //   name: 'ambientDistortion',
      //   effect: ambientDistortion,
      //   wet: defaultWetValue,
      //   on: false
      // },
      // ambientFeedbackDelay: {
      //   name: 'ambientFeedbackDelay',
      //   effect: ambientFeedbackDelay,
      //   wet: defaultWetValue,
      //   on: false
      // },
      // ambientFreeverb: {
      //   name: 'ambientFreeverb',
      //   effect: ambientFreeverb,
      //   wet: defaultWetValue,
      //   on: false
      // },
      // ambientPhaser: {
      //   name: 'ambientPhaser',
      //   effect: ambientPhaser,
      //   wet: defaultWetValue,
      //   on: false
      // },
      // ambientPingPongDelay: {
      //   name: 'ambientPingPongDelay',
      //   effect: ambientPingPongDelay,
      //   wet: defaultWetValue,
      //   on: false
      // },
      // ambientPart1: {
      //   part: parts.part4(ambientSynth),
      //   on: false
      // },
      // leadSynth,
      // leadAutoPanner: {
      //   name: 'leadAutoPanner',
      //   effect: leadAutoPanner,
      //   wet: defaultWetValue,
      //   on: false
      // },
      // leadAutoWah: {
      //   name: 'leadAutoWah',
      //   effect: leadAutoWah,
      //   wet: defaultWetValue,
      //   on: false
      // },
      // leadBitCrusher: {
      //   name: 'leadBitCrusher',
      //   effect: leadBitCrusher,
      //   wet: defaultWetValue,
      //   on: false
      // },
      // leadChebyshev: {
      //   name: 'leadChebyshev',
      //   effect: leadChebyshev,
      //   wet: defaultWetValue,
      //   on: false
      // },
      // leadDistortion: {
      //   name: 'leadDistortion',
      //   effect: leadDistortion,
      //   wet: defaultWetValue,
      //   on: false
      // },
      // leadFeedbackEffect: {
      //   name: 'leadFeedbackEffect',
      //   effect: leadFeedbackEffect,
      //   wet: defaultWetValue,
      //   on: false
      // },
      // leadJcReverb: {
      //   name: 'leadJcReverb',
      //   effect: leadJcReverb,
      //   wet: defaultWetValue,
      //   on: false
      // },
      // leadPitchShift: {
      //   name: 'leadPitchShift',
      //   effect: leadPitchShift,
      //   wet: defaultWetValue,
      //   on: false
      // },
      // leadReverb: {
      //   name: 'leadReverb',
      //   effect: leadReverb,
      //   wet: defaultWetValue,
      //   on: false
      // },
      // leadStereoWidener: {
      //   name: 'leadStereoWidener',
      //   effect: leadStereoWidener,
      //   wet: defaultWetValue,
      //   on: false
      // },
      // leadTremolo: {
      //   name: 'leadTremolo',
      //   effect: leadTremolo,
      //   wet: defaultWetValue,
      //   on: false
      // },
      // leadVibrato: {
      //   name: 'leadVibrato',
      //   effect: leadVibrato,
      //   wet: defaultWetValue,
      //   on: false
      // },
      // loop1: {
      //   loop: loop1,
      //   on: false
      // },
      // loop3: {
      //   loop: loop3,
      //   on: false
      // },
      // loop4: {
      //   loop: loop4,
      //   on: false
      // },
      // loop5: {
      //   loop: loop5,
      //   on: false
      // },
      // part1: {
      //   part: parts.part1(leadSynth),
      //   on: false
      // },
      drumLoop1Kick: {
        loop: drumLoop1Kick,
        on: false
      },
      drumLoop1Snare: {
        loop: drumLoop1Snare,
        on: false
      },
      // drumLoop2Kick: {
      //   loop: drumLoop2Kick,
      //   on: false
      // },
      // drumLoop2Snare: {
      //   loop: drumLoop2Snare,
      //   on: false
      // },
      drumLoop3Snare: {
        part: drumLoop3Snare,
        on: false
      },
      drumLoopPlaying: 'none',
      lastChange: Date.now(),
      timeout: 100,
      bpm: 90,
      volume: 10
    }

    _.bindAll(
      this,
      // 'getRandomArbitrary',
      // 'generateRandom',
      'copyAll',
      'toggleLoop',
      'toggleDrum',
      'togglePart',
      'changeBpmValue',
      'changeVolumeValue',
      'changeSynthValue',
      'toggleEffect',
      'changeEffectWetValue',
      'changeEffectValue',
      'loadPreset',
      'savePreset',
      'setPreset',
      'nextMeasure'
    )
  }

  componentDidMount() {
    // this.generateRandom()

    // let { name, effect, wet, on } = this.state.ambientDistortion

    // console.log(this.props)

    // effect.wet.value = on == true ? this.props.ambientDistortion.wet : 0
    // effect.distortion = this.props.ambientDistortion.effect.distortion
    // effect.oversample = this.props.ambientDistortion.effect.oversample

    // this.setState({
    //   ambientDistortion: {
    //     name,
    //     effect,
    //     wet: this.props.ambientDistortion.wet,
    //     on
    //   }
    // })

    Tone.Transport.bpm.value = this.state.bpm
    Tone.Transport.start()
    Tone.Transport.scheduleRepeat(this.nextMeasure, '1m')
    // Tone.context.lookAhead = 1
    // Tone.Transport.start('+1')
  }

  nextMeasure() {
    console.log('next measure')
  }

  copyAll() {
    const { ambientDistortion } = this.state

    const data = {
      ambientDistortion: {
        name: ambientDistortion.name,
        effect: {
          distortion: ambientDistortion.effect.distortion,
          oversample: ambientDistortion.effect.oversample
        },
        wet: ambientDistortion.wet,
        on: ambientDistortion.on
      }
    }
    console.log(JSON.stringify(data))
  }

  // getRandomArbitrary(min, max) {
  //   return Math.floor(Math.random() * (max - min)) + min
  // }

  // generateRandom() {
  //   const { lastChange, timeout } = this.state
  //
  //   if (Date.now() - lastChange >= timeout) {
  //     const random = this.getRandomArbitrary(100, 3000)
  //
  //     this.setState({
  //       lastChange: Date.now(),
  //       timeout: random
  //     })
  //
  //     this.changeDistortionValue('distortion', random / 30)
  //   }
  //
  //   setTimeout(() => this.generateRandom(), timeout)
  // }

  toggleDrum(drumLoop) {
    let drumLoopSnare = this.state[drumLoop + 'Snare']
    let drumLoopKick = this.state[drumLoop + 'Kick']
    let { drumLoopPlaying } = this.state
    let drumLoopSnarePlaying = this.state[drumLoopPlaying + 'Snare']
    let drumLoopKickPlaying = this.state[drumLoopPlaying + 'Kick']

    if (drumLoopPlaying != 'none') {
      // drumLoopSnarePlaying.loop.mute = true
      // drumLoopKickPlaying.loop.mute = true
      drumLoopSnarePlaying.loop.stop()
      drumLoopKickPlaying.loop.stop()
    }

    if (drumLoopSnare.on != true) {
      // drumLoopSnare.loop.mute = false
      drumLoopSnare.loop.start()
    }

    if (drumLoopKick.on != true) {
      // drumLoopKick.loop.mute = false
      drumLoopKick.loop.start()
    }

    if (drumLoopPlaying != 'none') {
      this.setState({
        [`${drumLoopPlaying + 'Snare'}`]: {
          loop: drumLoopSnarePlaying.loop,
          on: !drumLoopSnarePlaying.on
        },
        [`${drumLoopPlaying + 'Kick'}`]: {
          loop: drumLoopKickPlaying.loop,
          on: !drumLoopKickPlaying.on
        },
        [`${drumLoop + 'Snare'}`]: {
          loop: drumLoopSnare.loop,
          on: !drumLoopSnare.on
        },
        [`${drumLoop + 'Kick'}`]: {
          loop: drumLoopKick.loop,
          on: !drumLoopKick.on
        },
        drumLoopPlaying: drumLoop
      })
    } else {
      this.setState({
        [`${drumLoop + 'Snare'}`]: {
          loop: drumLoopSnare.loop,
          on: !drumLoopSnare.on
        },
        [`${drumLoop + 'Kick'}`]: {
          loop: drumLoopKick.loop,
          on: !drumLoopKick.on
        },
        drumLoopPlaying: drumLoop
>>>>>>> performance
      })
    }
  }

<<<<<<< HEAD
  toggleDrum(drumName) {
    let { drums } = this.state
    let { part, on, volume, parts } = drums[drumName]

    parts.map((p, i) => {
      if (on == true) {
        p.mute = true
      } else {
        if (i == part) {
          p.mute = false
        }
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
=======
  toggleLoop(loopName) {
    let { loop, on } = this.state[loopName]

    if (on == true) {
      loop.stop()
      // loop.mute = true
    } else {
      loop.start()
      // loop.mute = false
    }

    this.setState({
      [`${loopName}`]: {
        loop: loop,
        on: !on
      }
    })
  }

  togglePart(partName) {
    let { part, on } = this.state[partName]

    if (on == true) {
      part.stop()
      // part.mute = true
    } else {
      part.start()
      // part.mute = false
    }

    this.setState({
      [`${partName}`]: {
        part: part,
        on: !on
      }
    })
  }

  changeBpmValue(synthName, effectName, value) {
    Tone.Transport.bpm.value = Math.round(value)
    Tone.Master.volume = Math.round(value)

    this.setState({
      bpm: Math.round(value)
    })
  }

  changeVolumeValue(synthName, effectName, value) {
    Tone.Master.volume.value = Math.round(value)

    this.setState({
      volume: Math.round(value)
>>>>>>> performance
    })
  }

  changeSynthValue(synthName, effectName, value) {
    let regexBefore = /(.*)\./
    let regexAfter = /\.(.*)/
    let synth = this.state[synthName]
    let effectNameNamespace = effectName.match(regexBefore)[1]
    let effectNameInNamespace = effectName.match(regexAfter)[1]
    // let { envelope, oscillator } = synth.instrument
    // let { envelope } = synth
    // console.log('test', effectName, effectName.match(regexAfter))

<<<<<<< HEAD
    if (synthName == 'leadSynth') {
=======
    if (synthName == 'bassSynth' || synthName == 'leadSynth') {
>>>>>>> performance
      if (effectNameNamespace == 'oscillator') {
        synth.voices[0].oscillator[effectNameInNamespace] = value
      } else if (effectNameNamespace == 'envelope') {
        synth.voices[0].envelope[effectNameInNamespace] = value
      }
<<<<<<< HEAD
    } else if (synthName == 'bassSynth') {
      if (effectNameNamespace == 'oscillator') {
        synth.oscillator[effectNameInNamespace] = value
      } else if (effectNameNamespace == 'envelope') {
        synth.envelope[effectNameInNamespace] = value
      }
=======
>>>>>>> performance
    } else {
      synth[effectName] = value
    }

    this.setState({
      [`${synthName}`]: synth
    })
  }

  toggleEffect(effectName) {
    let { name, effect, wet, on } = this.state[effectName]

    effect.wet.value = on == true ? 0 : wet

    this.setState({
      [`${effectName}`]: {
        name,
        effect,
        wet,
        on: !on
      }
    })
  }

  changeEffectWetValue(effectName, effectProperty, value) {
    let { name, effect, wet, on } = this.state[effectName]

    effect[effectProperty].value = on == true ? value : 0
    wet = value

    this.setState({
      [`${effectName}`]: {
        name,
        effect,
        wet,
        on
      }
    })
  }

  changeEffectValue(effectName, effectProperty, value) {
    let { name, effect, wet, on } = this.state[effectName]

    if (effectProperty == 'order') {
      value = Math.round(value)
    }

    effect[effectProperty] = value

    this.setState({
      [`${effectName}`]: {
        name,
        effect,
        wet,
        on
      }
    })
  }

<<<<<<< HEAD
  changeChannelValue(channelName, valueName, value) {
    console.log(channelName, valueName, value)
    let { name, channel, pan, volume, mute, solo } = this.state[channelName]
    let shouldComponentUpdate = false

    channel[valueName].value = value

    if (valueName == 'pan') {
      if (pan != value) {
        pan = value
        shouldComponentUpdate = true
      }
    }

    if (valueName == 'volume') {
      if (volume != value) {
        volume = value
        shouldComponentUpdate = true
      }
    }

    if (shouldComponentUpdate) {
      this.setState({
        [`${channelName}`]: {
          name,
          channel,
          pan,
          volume,
          mute,
          solo
        }
      })
    }
  }

  toggleChannelValue(channelName, valueName) {
    let { name, channel, pan, volume, mute, solo } = this.state[channelName]
    channel[valueName] = !channel[valueName]

    if (valueName == 'mute') {
      mute = !mute
    }

    if (valueName == 'solo') {
      solo = !solo
    }

    this.setState({
      [`${channelName}`]: {
        name,
        channel,
        pan,
        volume,
        mute,
        solo
      }
    })
  }

  toggleNote(synth, note) {
    keysSynth.triggerAttack(note, '16n')
  }

  stopNote(synth) {
    keysSynth.triggerRelease()
  }

  render() {
    return (
      <div>
        <div
          className="StartButton"
          onClick={() => this.handleStart()}
          onTouchStart={() => this.handleStart()}
        >
          Start
        </div>

        <div className="drumRack">
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

          <div className="Drum">
            <div className="controlsContainer">
              <div className="controlsRow">
                <div
                  className="changeDrumLoop"
                  onClick={() => this.toggleNote('C1')}
                ></div>
                <div
                  className="changeDrumLoop"
                  onClick={() => this.toggleNote('D1')}
                ></div>
                <div
                  className="changeDrumLoop"
                  onClick={() => this.toggleNote('E1')}
                ></div>
                <div
                  className="changeDrumLoop"
                  onClick={() => this.toggleNote('F1')}
                ></div>
                <div
                  className="changeDrumLoop"
                  onClick={() => this.toggleNote('G1')}
                ></div>
                <div
                  className="changeDrumLoop"
                  onClick={() => this.toggleNote('A1')}
                ></div>
                <div
                  className="changeDrumLoop"
                  onClick={() => this.toggleNote('B1')}
                ></div>
                <div
                  className="changeDrumLoop"
                  onClick={() => this.toggleNote('C2')}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="effectsBoard">
          <PolySynth
            text="Light Synth"
            synth="lightSynth"
            instrument={this.state.lightSynth}
            on=""
            togglePlay=""
            changeSynthValue={this.changeSynthValue}
          />
          <AutoFilter
            {...this.state.lightSynthFilter}
            toggleEffect={() => this.toggleEffect('lightSynthFilter')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <JcReverb
            {...this.state.lightSynthReverb}
            toggleEffect={() => this.toggleEffect('lightSynthReverb')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Chorus
            {...this.state.lightSynthChorus}
            toggleEffect={() => this.toggleEffect('lightSynthChorus')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Channel
            {...this.state.lightSynthChannel}
            changeChannelValue={this.changeChannelValue}
            toggleChannelValue={this.toggleChannelValue}
          />
        </div>

        <div className="effectsBoard">
          <ToneSynth
            text="Bass Synth"
            synth="bassSynth"
            instrument={this.state.bassSynth}
            on=""
            togglePlay=""
            changeSynthValue={this.changeSynthValue}
          />
          <Distortion
            {...this.state.bassSynthDistortion}
            toggleEffect={() => this.toggleEffect('bassSynthDistortion')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <AutoFilter
            {...this.state.bassSynthFilter}
            toggleEffect={() => this.toggleEffect('bassSynthFilter')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Channel
            {...this.state.bassSynthChannel}
            changeChannelValue={this.changeChannelValue}
            toggleChannelValue={this.toggleChannelValue}
          />
        </div>

        <div className="effectsBoard">
          <ToneSynth
            text="Solo Synth"
            synth="soloSynth"
            instrument={this.state.soloSynth}
            on=""
            togglePlay=""
            changeSynthValue={this.changeSynthValue}
          />
          <Chorus
            {...this.state.soloSynthChorus}
            toggleEffect={() => this.toggleEffect('soloSynthChorus')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <JcReverb
            {...this.state.soloSynthReverb}
            toggleEffect={() => this.toggleEffect('soloSynthReverb')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <AutoFilter
            {...this.state.soloSynthFilter}
            toggleEffect={() => this.toggleEffect('soloSynthFilter')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Channel
            {...this.state.soloSynthChannel}
            changeChannelValue={this.changeChannelValue}
            toggleChannelValue={this.toggleChannelValue}
          />
        </div>

        <div className="effectsBoard">
          <ToneSynth
            text="High Synth"
            synth="highSynth"
            instrument={this.state.highSynth}
            on=""
            togglePlay=""
            changeSynthValue={this.changeSynthValue}
          />
          <Tremolo
            {...this.state.highSynthTremolo}
            toggleEffect={() => this.toggleEffect('highSynthTremolo')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Vibrato
            {...this.state.highSynthVibrato}
            toggleEffect={() => this.toggleEffect('highSynthVibrato')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Distortion
            {...this.state.highSynthDistortion}
            toggleEffect={() => this.toggleEffect('highSynthDistortion')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <FeedbackDelay
            {...this.state.highSynthFeedbackDelay}
            toggleEffect={() => this.toggleEffect('highSynthFeedbackDelay')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <FeedbackEffect
            {...this.state.highSynthFeedbackEffect}
            toggleEffect={() => this.toggleEffect('highSynthFeedbackEffect')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Freeverb
            {...this.state.highSynthFreeverb}
            toggleEffect={() => this.toggleEffect('highSynthFreeverb')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Channel
            {...this.state.highSynthChannel}
            changeChannelValue={this.changeChannelValue}
            toggleChannelValue={this.toggleChannelValue}
=======
  loadPreset(presetNumber) {
    const url = '/load_preset/' + presetNumber + '.json'
    const { setPreset } = this

    fetch(url)
      .then(function(response) {
        return response.json()
      })
      .then(function(json) {
        // console.log('parsed json', json)
        setPreset(json)
      })
      .catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }

  setPreset(preset) {
    const {
      // ambientSynth
      // ambientAutoFilter,
      // ambientChorus,
      ambientDistortion
      // ambientFeedbackDelay,
      // ambientFreeverb,
      // ambientPhaser,
      // ambientPingPongDelay
    } = JSON.parse(preset)

    // console.log(preset)
    console.log(JSON.parse(preset))

    let { effect } = this.state.ambientDistortion

    effect.distortion = ambientDistortion.effect.distortion
    effect.oversample = ambientDistortion.effect.oversample

    this.setState({
      // ambientSynth: {
      //   name: ambientSynth.name,
      //   effect: ambientSynth.effect,
      //   wet: ambientSynth.wet,
      //   on: ambientSynth.on
      // }
      // ambientAutoFilter,
      // ambientChorus,
      ambientDistortion: {
        name: ambientDistortion.name,
        effect: effect,
        wet: ambientDistortion.wet,
        on: ambientDistortion.on
      }
      // ambientFeedbackDelay,
      // ambientFreeverb,
      // ambientPhaser,
      // ambientPingPongDelay
    })
  }

  savePreset(presetNumber) {
    const {
      ambientSynth,
      ambientAutoFilter,
      ambientChorus,
      ambientDistortion,
      ambientFeedbackDelay,
      ambientFreeverb,
      ambientPhaser,
      ambientPingPongDelay
    } = this.state

    const data = {
      ambientSynth: {
        oscillator: {
          type: ambientSynth.oscillator.type
        },
        envelope: {
          attack: ambientSynth.envelope.attack,
          decay: ambientSynth.envelope.decay,
          sustain: ambientSynth.envelope.sustain,
          release: ambientSynth.envelope.release
        }
      },
      ambientAutoFilter: {
        name: ambientAutoFilter.name,
        effect: {
          frequency: ambientAutoFilter.effect.frequency.value,
          type: ambientAutoFilter.effect.type,
          depth: ambientAutoFilter.effect.depth.value,
          baseFrequency: ambientAutoFilter.effect.baseFrequency,
          octaves: ambientAutoFilter.effect.octaves,
          filter: {
            type: ambientAutoFilter.effect.filter.type,
            rolloff: ambientAutoFilter.effect.filter.rolloff,
            Q: ambientAutoFilter.effect.filter.Q.value
          }
        },
        wet: ambientAutoFilter.wet,
        on: ambientAutoFilter.on
      },
      ambientChorus: {
        name: ambientChorus.name,
        effect: {
          frequency: ambientChorus.effect.frequency.value,
          delayTime: ambientChorus.effect.delayTime,
          depth: ambientChorus.effect.depth,
          type: ambientChorus.effect.type,
          spread: ambientChorus.effect.spread
        },
        wet: ambientChorus.wet,
        on: ambientChorus.on
      },
      ambientDistortion: {
        name: ambientDistortion.name,
        effect: {
          distortion: ambientDistortion.effect.distortion,
          oversample: ambientDistortion.effect.oversample
        },
        wet: ambientDistortion.wet,
        on: ambientDistortion.on
      },
      ambientFeedbackDelay: {
        name: ambientFeedbackDelay.name,
        effect: {
          delayTime: ambientFeedbackDelay.effect.delayTime.value,
          maxDelay: ambientFeedbackDelay.effect.maxDelay
        },
        wet: ambientFeedbackDelay.wet,
        on: ambientFeedbackDelay.on
      },
      ambientFreeverb: {
        name: ambientFreeverb.name,
        effect: {
          roomSize: ambientFreeverb.effect.roomSize.value,
          dampening: ambientFreeverb.effect.dampening.value
        },
        wet: ambientFreeverb.wet,
        on: ambientFreeverb.on
      },
      ambientPhaser: {
        name: ambientPhaser.name,
        effect: {
          frequency: ambientPhaser.effect.frequency.value,
          octaves: ambientPhaser.effect.octaves,
          stages: ambientPhaser.effect.stages,
          Q: ambientPhaser.effect.Q.value,
          baseFrequency: ambientPhaser.effect.baseFrequency
        },
        wet: ambientPhaser.wet,
        on: ambientPhaser.on
      },
      ambientPingPongDelay: {
        name: ambientPingPongDelay.name,
        effect: {
          delayTime: ambientPingPongDelay.effect.delayTime.value,
          maxDelayTime: ambientPingPongDelay.effect.maxDelayTime
        },
        wet: ambientPingPongDelay.wet,
        on: ambientPingPongDelay.on
      }
    }

    // console.log(data)
    // console.log(JSON.stringify(data))

    const preset = {
      id: presetNumber,
      data: data
    }

    fetch('/save_preset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preset)
    })
  }

  render() {
    let {
      kickDrum,
      kickAutoFilter,
      kickFreeverb,
      kickChebyshev,
      snareDrum,
      snareAutoFilter,
      snarePitchShift,
      snareEQ,
      snareFreeverb,
      bassSynth,
      bassFreeverb,
      bassPhaser,
      ambientSynth,
      ambientAutoFilter,
      ambientChorus,
      ambientDistortion,
      ambientFeedbackDelay,
      ambientFreeverb,
      ambientPhaser,
      ambientPingPongDelay,
      ambientPart1,
      leadSynth,
      leadAutoPanner,
      leadAutoWah,
      leadBitCrusher,
      leadChebyshev,
      leadDistortion,
      leadFeedbackEffect,
      leadJcReverb,
      leadPitchShift,
      leadReverb,
      leadStereoWidener,
      leadTremolo,
      leadVibrato,
      bassPart1,
      loop1,
      loop4,
      loop5,
      part1,
      drumLoop3Snare,
      drumLoop1Kick,
      drumLoop1Snare,
      bpm,
      volume
    } = this.state

    let {
      toggleEffect,
      toggleLoop,
      toggleDrum,
      togglePart,
      changeBpmValue,
      changeVolumeValue,
      changeSynthValue,
      changeEffectWetValue,
      changeEffectValue,
      changeEffectFilterValue,
      loadPreset,
      savePreset
    } = this

    return (
      <div>
        <div onClick={() => toggleDrum('drumLoop1')}>DRUM LOOP 1</div>
        <div onClick={() => togglePart('drumLoop3Snare')}>DRUM LOOP 3</div>

        <div className="effectsBoard">
          <PolySynth
            synth="bassSynth"
            instrument={bassSynth}
            on={bassPart1.on}
            togglePlay={() => togglePart('bassPart1')}
            changeSynthValue={changeSynthValue}
          />
          <Freeverb
            {...bassFreeverb}
            toggleEffect={() => toggleEffect('bassFreeverb')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <Phaser
            {...bassPhaser}
            toggleEffect={() => toggleEffect('bassPhaser')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
>>>>>>> performance
          />
        </div>
      </div>
    )
  }
}
