import _, { merge } from 'lodash'
import React from 'react'
import Tone from 'tone'
let unmuteAudio = require('unmute-ios-audio')

import * as drums from '../tunes/r3-drums'
import * as samples from '../tunes/samples'
import * as synths from '../tunes/synths'
import * as effects from '../tunes/r3-effects'
import * as utilities from '../tunes/utilities'

import * as noiseSynthTunes from '../tunes/r3-noise-synth'

import Channel from '../components/utilities/Channel'

import Drum from '../components/synths/Drum'

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
// import Chorus from '../components/effects/Chorus'
// import Phaser from '../components/effects/Phaser'

let bpm = 90
const defaultWetValue = 1

let noiseSynthChannel = utilities.channel(0)

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

let noiseSynth = noiseSynthTunes.metalSynth()
let noiseSynthTremolo = noiseSynthTunes.tremolo()
let noiseSynthVibrato = noiseSynthTunes.vibrato()
let noiseSynthReverb = noiseSynthTunes.jcReverb()
let noiseSynthDistortion = noiseSynthTunes.distortion()
let noiseSynthPart = noiseSynthTunes.part(noiseSynth)

noiseSynth.chain(
  noiseSynth,
  noiseSynthTremolo,
  noiseSynthVibrato,
  noiseSynthReverb,
  noiseSynthDistortion
)

let keysOctave = 3

export default class Room3 extends React.Component {
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

    this.state = {
      drums: {
        kick: {
          part: 0,
          on: false,
          volume: 10
        },
        snare: {
          part: 0,
          on: false,
          volume: 10
        },
        hat: {
          part: 0,
          on: false,
          volume: 10
        }
      },
      noiseSynthTremolo: {
        name: 'lightSynthFilter',
        effect: noiseSynthTremolo,
        wet: noiseSynthTremolo.wet.value,
        on: true
      },
      noiseSynthVibrato: {
        name: 'lightSynthFilter',
        effect: noiseSynthVibrato,
        wet: noiseSynthVibrato.wet.value,
        on: true
      },
      noiseSynthReverb: {
        name: 'lightSynthFilter',
        effect: noiseSynthReverb,
        wet: noiseSynthReverb.wet.value,
        on: true
      },
      noiseSynthDistortion: {
        name: 'lightSynthFilter',
        effect: noiseSynthDistortion,
        wet: noiseSynthDistortion.wet.value,
        on: true
      },
      noiseSynthChannel: {
        name: 'noiseSynthChannel',
        channel: noiseSynthChannel,
        pan: noiseSynthChannel.pan.value,
        volume: noiseSynthChannel.volume.value,
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

      case '16':
        // start bass synth
        bassSynthPart.mute = false
        break

      case '20':
        // start hat loop 1
        toggleDrum('hat')
        break

      case '24':
        // start kick and snare
        toggleDrum('kick')
        toggleDrum('snare')
        break

      case '32':
        // start solo synth
        soloSynthPart.mute = false
        break

      case '44':
        // stop solo synth
        soloSynthPart.mute = true
        // start kick loop 2
        changeDrumLoop('kick', 1)
        // start snare loop 2
        changeDrumLoop('snare', 1)
        break

      case '56':
        // start solo synth
        soloSynthPart.mute = false
        // start kick loop 1
        changeDrumLoop('kick', 0)
        // start snare loop 1
        changeDrumLoop('snare', 0)
        break

      case '72':
        // stop solo synth
        soloSynthPart.mute = true
        // start high synth
        highSynthPart.mute = false
        // start kick loop 2
        changeDrumLoop('kick', 1)
        // start snare loop 2
        changeDrumLoop('snare', 1)
        // how to make sound tuning
        // ???
        break

      case '88':
        // start kick loop 3
        changeDrumLoop('kick', 2)
        // start hat loop 2
        changeDrumLoop('hat', 1)
        break

      case '96':
        // stop kick
        toggleDrum('kick')
        // stop snare
        toggleDrum('snare')
        break

      case '98':
        // stop hat
        toggleDrum('hat')
        break

      case '100':
        // start snare loop 2
        changeDrumLoop('snare', 1)
        toggleDrum('snare')
        break

      case '104':
        // stop high synth
        highSynthPart.mute = true
        // start solo synth
        soloSynthPart.mute = false
        // start kick loop 4
        changeDrumLoop('kick', 3)
        toggleDrum('kick')
        // start hat loop 3
        changeDrumLoop('hat', 2)
        toggleDrum('hat')
        break

      case '120':
        // start high synth
        highSynthPart.mute = false
        // stop solo synth
        soloSynthPart.mute = true
        // stop kick
        toggleDrum('kick')
        // stop snare
        toggleDrum('snare')
        // stop hat
        toggleDrum('hat')
        break

      case '128':
        // stop light synth
        lightSynthPart.mute = true
        // stop high synth
        highSynthPart.mute = true
        // how to move sliders
        // ???
        break

      case '144':
        // start solo synth
        soloSynthPart.mute = false
        // start light synth
        lightSynthPart.mute = false
        break

      case '148':
        // start kick loop 4
        changeDrumLoop('kick', 3)
        toggleDrum('kick')
        // start snare loop 2
        changeDrumLoop('snare', 1)
        toggleDrum('snare')
        // start hat loop 3
        changeDrumLoop('hat', 2)
        toggleDrum('hat')
        break

      case '164':
        // start high synth
        highSynthPart.mute = false
        // stop solo synth
        soloSynthPart.mute = true
        // stop light synth
        lightSynthPart.mute = true
        // stop bass synth
        bassSynthPart.mute = true
        // stop kick
        toggleDrum('kick')
        // stop snare
        toggleDrum('snare')
        // stop hat
        toggleDrum('hat')
        break

      case '166':
        // start light synth
        lightSynthPart.mute = false
        break

      case '168':
        // stop high synth
        highSynthPart.mute = true
        // stop light synth
        lightSynthPart.mute = true
        // start hat loop 3
        toggleDrum('hat')
        break

      case '169':
        // stop hat
        toggleDrum('hat')
        break
    }
  }

  handleStart() {
    unmuteAudio()
    Tone.Transport.bpm.value = bpm
    Tone.Transport.scheduleRepeat(this.nextMeasure, '1m')
    Tone.Transport.start()

    this.state.drums.hat.parts.map(part => {
      part.mute = true
      part.start()
    })

    noiseSynthPart.mute = true

    noiseSynthPart.start()

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
        this.toggleNote('C' + keysOctave)
        break
      case 54:
        this.toggleNote('C#' + keysOctave)
        break
      case 89:
        this.toggleNote('D' + keysOctave)
        break
      case 55:
        this.toggleNote('D#' + keysOctave)
        break
      case 85:
        this.toggleNote('E' + keysOctave)
        break
      // case 56:
      // this.toggleNote('E3')
      // break
      case 73:
        this.toggleNote('F' + keysOctave)
        break
      case 57:
        this.toggleNote('F#' + keysOctave)
        break
      case 79:
        this.toggleNote('G' + keysOctave)
        break
      case 48:
        this.toggleNote('G#' + keysOctave)
        break
      case 80:
        this.toggleNote('A' + keysOctave)
        break
      case 173:
        this.toggleNote('A#' + keysOctave)
        break
      case 219:
        this.toggleNote('B' + keysOctave)
        break
      // case 61:
      case 221:
        this.toggleNote('C' + (keysOctave + 1))
        break
    }
  }

  handleKeyup() {
    this.stopNote()
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

    if (synthName == 'leadSynth') {
      if (effectNameNamespace == 'oscillator') {
        synth.voices[0].oscillator[effectNameInNamespace] = value
      } else if (effectNameNamespace == 'envelope') {
        synth.voices[0].envelope[effectNameInNamespace] = value
      }
    } else if (synthName == 'bassSynth') {
      if (effectNameNamespace == 'oscillator') {
        synth.oscillator[effectNameInNamespace] = value
      } else if (effectNameNamespace == 'envelope') {
        synth.envelope[effectNameInNamespace] = value
      }
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

  toggleNote(note) {
    noiseSynth.triggerAttack(note, '16n')
  }

  stopNote() {
    highSynth.triggerRelease()
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
            text="Noise Synth"
            synth="noiseSynth"
            instrument={this.state.noiseSynth}
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
      </div>
    )
  }
}
