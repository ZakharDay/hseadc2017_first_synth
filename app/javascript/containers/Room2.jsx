import _, { merge } from 'lodash'
import React from 'react'
import Tone from 'tone'

// import * as drums from '../tunes/drums'
import * as drumLoops from '../tunes/r2-drum-loops'
import * as samples from '../tunes/samples'
// import * as effects from '../tunes/effects'
import * as utilities from '../tunes/utilities'

import * as bassSynthTunes from '../tunes/r2-bass-synth'
import * as highSynthTunes from '../tunes/r2-high-synth'
import * as kickDrumTunes from '../tunes/r2-kick-drum'
import * as hatDrumTunes from '../tunes/r2-hat-drum'
import * as snareDrumTunes from '../tunes/r2-snare-drum'

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

import PolySynth from '../components/synths/PolySynth'
import ToneSynth from '../components/synths/ToneSynth'
import Channel from '../components/utilities/Channel'

const defaultWetValue = 1

// ============
// Channels
// ============
let kickDrumChannel = utilities.channel(6)
let hatDrumChannel = utilities.channel(0)
let snareDrumChannel = utilities.channel(0)
let highSynthChannel = utilities.channel(-7)

// ============
// Drums
// ============
let kickDrum = kickDrumTunes.kickDrum()
let kickConvolver = new Tone.Convolver(samples.hall)
let kickDistortion = kickDrumTunes.distortion()
let kickVibrato = kickDrumTunes.vibrato()
let kickDelay = kickDrumTunes.pingPongDelay()
kickDrum.chain(
  kickConvolver,
  kickDistortion,
  kickVibrato,
  kickDelay,
  kickDrumChannel
)

let hatDrum = hatDrumTunes.hatDrum()
let hatConvolver = new Tone.Convolver(samples.hall)
let hatDrumFilter = hatDrumTunes.autoFilter()
let hatDrumReverb = hatDrumTunes.freeverb()
let hatDrumDelay = hatDrumTunes.feedbackDelay()
hatDrum.chain(
  hatConvolver,
  hatDrumFilter,
  hatDrumReverb,
  hatDrumDelay,
  hatDrumChannel
)

let snareHit = snareDrumTunes.snareHit()
let snareMembrane = snareDrumTunes.snareMembrane()
let snareConvolver = new Tone.Convolver(samples.hall)
let snareEQ = snareDrumTunes.snareEQ()
let snareDrumVibrato = snareDrumTunes.vibrato()
let snareDrumChebyshev = snareDrumTunes.chebyshev()
let snareDrumChorus = snareDrumTunes.chorus()
let snareDrumTremolo = snareDrumTunes.tremolo()

snareHit.chain(
  snareEQ,
  snareDrumTremolo,
  snareDrumVibrato,
  snareDrumChebyshev,
  snareDrumChorus,
  snareConvolver,
  snareDrumChannel
)

snareMembrane.chain(
  snareEQ,
  snareDrumTremolo,
  snareDrumVibrato,
  snareDrumChebyshev,
  snareDrumChorus,
  snareConvolver,
  snareDrumChannel
)

let drumLoopKick = drumLoops.kick(kickDrum)
let drumLoopSnare = drumLoops.snare(snareHit, snareMembrane)
let drumLoopHat = drumLoops.hat(hatDrum)

// ============
// Synths
// ============
let highSynth = highSynthTunes.metalSynth()
let highSynthTremolo = highSynthTunes.tremolo()
let highSynthVibrato = highSynthTunes.vibrato()
let highSynthDistortion = highSynthTunes.distortion()
let highSynthDelay = highSynthTunes.pingPongDelay()
let highSynthStereoWidener = highSynthTunes.stereoWidener()
let highSynthPart1 = highSynthTunes.part1(highSynth)

highSynth.chain(
  highSynthTremolo,
  highSynthVibrato,
  highSynthDistortion,
  highSynthDelay,
  highSynthStereoWidener,
  highSynthChannel
)

export default class Room2 extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(
      this,
      'changeSynthValue',
      'toggleEffect',
      'changeEffectWetValue',
      'changeEffectValue',
      'changeChannelValue',
      'toggleChannelValue',
      'toggleNote',
      'stopNote',
      'toggleDrum',
      'handleKeydown',
      'handleKeyup'
    )

    this.state = {
      drums: {
        kick: {
          part: 0,
          on: false,
          volume: 10,
          parts: [drumLoopKick]
        },
        snare: {
          part: 0,
          on: false,
          volume: 10,
          parts: [drumLoopSnare]
        },
        hat: {
          part: 0,
          on: false,
          volume: 10,
          parts: [drumLoopHat]
        }
      },
      highSynth,
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
      highSynthDelay: {
        name: 'highSynthDelay',
        effect: highSynthDelay,
        wet: highSynthDelay.wet.value,
        on: true
      },
      highSynthStereoWidener: {
        name: 'highSynthStereoWidener',
        effect: highSynthStereoWidener,
        wet: highSynthStereoWidener.wet.value,
        on: true
      },
      highSynthChannel: {
        name: 'highSynthChannel',
        channel: highSynthChannel,
        pan: highSynthChannel.pan.value,
        volume: highSynthChannel.volume.value,
        mute: false,
        solo: false
      },
      kickDistortion: {
        name: 'kickDistortion',
        effect: kickDistortion,
        wet: kickDistortion.wet.value,
        on: true
      },
      kickVibrato: {
        name: 'kickVibrato',
        effect: kickVibrato,
        wet: kickVibrato.wet.value,
        on: true
      },
      kickDelay: {
        name: 'kickDelay',
        effect: kickDelay,
        wet: kickDelay.wet.value,
        on: true
      },
      kickDrumChannel: {
        name: 'kickDrumChannel',
        channel: kickDrumChannel,
        pan: kickDrumChannel.pan.value,
        volume: kickDrumChannel.volume.value,
        mute: false,
        solo: false
      },
      hatDrumFilter: {
        name: 'hatDrumFilter',
        effect: hatDrumFilter,
        wet: hatDrumFilter.wet.value,
        on: true
      },
      hatDrumReverb: {
        name: 'hatDrumReverb',
        effect: hatDrumReverb,
        wet: hatDrumReverb.wet.value,
        on: true
      },
      hatDrumDelay: {
        name: 'hatDrumDelay',
        effect: hatDrumDelay,
        wet: hatDrumDelay.wet.value,
        on: true
      },
      hatDrumChannel: {
        name: 'hatDrumChannel',
        channel: hatDrumChannel,
        pan: hatDrumChannel.pan.value,
        volume: hatDrumChannel.volume.value,
        mute: false,
        solo: false
      },
      snareDrumChebyshev: {
        name: 'snareDrumChebyshev',
        effect: snareDrumChebyshev,
        wet: snareDrumChebyshev.wet.value,
        on: true
      },
      snareDrumChorus: {
        name: 'snareDrumChorus',
        effect: snareDrumChorus,
        wet: snareDrumChorus.wet.value,
        on: true
      },
      snareDrumTremolo: {
        name: 'snareDrumTremolo',
        effect: snareDrumTremolo,
        wet: snareDrumTremolo.wet.value,
        on: true
      },
      snareDrumVibrato: {
        name: 'snareDrumVibrato',
        effect: snareDrumVibrato,
        wet: snareDrumVibrato.wet.value,
        on: true
      },
      snareDrumChannel: {
        name: 'snareDrumChannel',
        channel: snareDrumChannel,
        pan: snareDrumChannel.pan.value,
        volume: snareDrumChannel.volume.value,
        mute: false,
        solo: false
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown)
    document.addEventListener('keyup', this.handleKeyup)
  }

  changeSynthValue(synthName, effectName, value) {
    let regexBefore = /(.*)\./
    let regexAfter = /\.(.*)/
    let synth = this.state[synthName]
    let effectNameNamespace = effectName.match(regexBefore)[1]
    let effectNameInNamespace = effectName.match(regexAfter)[1]

    if (synthName == 'bassSynth') {
      if (effectNameNamespace == 'oscillator') {
        synth.voices[0].oscillator[effectNameInNamespace] = value
        synth.voices[1].oscillator[effectNameInNamespace] = value
        synth.voices[2].oscillator[effectNameInNamespace] = value
      } else if (effectNameNamespace == 'envelope') {
        synth.voices[0].envelope[effectNameInNamespace] = value
        synth.voices[1].envelope[effectNameInNamespace] = value
        synth.voices[2].envelope[effectNameInNamespace] = value
      }
    } else {
      if (effectNameNamespace == 'envelope') {
        synth.envelope[effectNameInNamespace] = value
      } else {
        synth[effectNameInNamespace] = value
      }
    }

    this.setState({
      [`${synthName}`]: synth
    })
  }

  changeChannelValue(channelName, valueName, value) {
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
    let regexBefore = /(.*)\./
    let regexAfter = /\.(.*)/
    let effectFromState = this.state[effectName]
    let { name, effect, wet, on } = effectFromState
    let realEffectName = effectProperty.match(regexBefore)
    let valueSuffix = effectProperty.match(regexAfter)

    if (realEffectName && realEffectName.length > 0) {
      realEffectName = realEffectName[1]
      valueSuffix = valueSuffix[1]
      effect[realEffectName].value = value
    } else {
      effect[effectProperty] = value
    }

    if (effectProperty == 'order') {
      value = Math.round(value)
    }

    this.setState({
      [`${effectName}`]: {
        name,
        effect,
        wet,
        on
      }
    })
  }

  handleKeydown(e) {
    console.log(e.key, e.code, e.keyCode)

    switch (e.keyCode) {
      case 70:
        console.log('f')
        snareHit.triggerAttackRelease('16n')
        snareMembrane.triggerAttackRelease('E1', '16n')
        // snareDrum.triggerAttackRelease('16n')
        break
      case 71:
        console.log('g')
        // highhat.triggerAttackRelease(51, '16n', 1)
        hatDrum.triggerAttackRelease('16n')
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

  toggleNote(note) {
    highSynth.triggerAttack(note, '16n')
  }

  stopNote() {
    highSynth.triggerRelease()
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

  startRoom() {
    highSynthPart1.start()
    this.toggleDrum('kick')
    this.toggleDrum('hat')
  }

  stopRoom() {
    highSynthPart1.stop()
    this.toggleDrum('kick')
    this.toggleDrum('hat')
  }

  render() {
    return (
      <div>
        <div onClick={() => this.startRoom()}>Start</div>
        <div onClick={() => this.stopRoom()}>Stop</div>

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
          <PingPongDelay
            {...this.state.highSynthDelay}
            toggleEffect={() => this.toggleEffect('highSynthDelay')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <StereoWidener
            {...this.state.highSynthStereoWidener}
            toggleEffect={() => this.toggleEffect('highSynthStereoWidener')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Channel
            {...this.state.highSynthChannel}
            changeChannelValue={this.changeChannelValue}
            toggleChannelValue={this.toggleChannelValue}
          />
        </div>

        <div>Kick</div>

        <div className="effectsBoard">
          <Distortion
            {...this.state.kickDistortion}
            toggleEffect={() => this.toggleEffect('kickDistortion')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Vibrato
            {...this.state.kickVibrato}
            toggleEffect={() => this.toggleEffect('kickVibrato')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <PingPongDelay
            {...this.state.kickDelay}
            toggleEffect={() => this.toggleEffect('kickDelay')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Channel
            {...this.state.kickDrumChannel}
            changeChannelValue={this.changeChannelValue}
            toggleChannelValue={this.toggleChannelValue}
          />
        </div>

        <div>Hat</div>

        <div className="effectsBoard">
          <AutoFilter
            {...this.state.hatDrumFilter}
            toggleEffect={() => this.toggleEffect('hatDrumFilter')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Freeverb
            {...this.state.hatDrumReverb}
            toggleEffect={() => this.toggleEffect('hatDrumReverb')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <FeedbackDelay
            {...this.state.hatDrumDelay}
            toggleEffect={() => this.toggleEffect('hatDrumDelay')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Channel
            {...this.state.hatDrumChannel}
            changeChannelValue={this.changeChannelValue}
            toggleChannelValue={this.toggleChannelValue}
          />
        </div>

        <div>Snare</div>

        <div className="effectsBoard">
          <Tremolo
            {...this.state.snareDrumTremolo}
            toggleEffect={() => this.toggleEffect('snareDrumTremolo')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Vibrato
            {...this.state.snareDrumVibrato}
            toggleEffect={() => this.toggleEffect('snareDrumVibrato')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Chebyshev
            {...this.state.snareDrumChebyshev}
            toggleEffect={() => this.toggleEffect('snareDrumChebyshev')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Chorus
            {...this.state.snareDrumChorus}
            toggleEffect={() => this.toggleEffect('snareDrumChorus')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Channel
            {...this.state.hatDrumChannel}
            changeChannelValue={this.changeChannelValue}
            toggleChannelValue={this.toggleChannelValue}
          />
        </div>
      </div>
    )
  }
}
