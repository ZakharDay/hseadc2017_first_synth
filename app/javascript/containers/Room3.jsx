import _, { merge } from 'lodash'
import React from 'react'
import Tone from 'tone'
import { dest1, dest2 } from './Master'

import * as utilities from '../tunes/utilities'

import * as bassSynthTunes from '../tunes/r3-bass-synth'

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

// var ac = new AudioContext()
// var audio = new Audio()
// var o = ac.createOscillator();
// o.start();
// var dest1 = ac.createMediaStreamDestination()
// var dest2 = ac.createMediaStreamDestination()
// o.connect(dest);
// audio.src = URL.createObjectURL(dest.stream);
// audio.play();

let bassSynthChannel = utilities.channel(-27)

let bassSynth = bassSynthTunes.bass()
let bassSynthFilter = bassSynthTunes.autoFilter()
let bassSynthReverb = bassSynthTunes.jcReverb()
let bassSynthPart = bassSynthTunes.part(bassSynth)

// let bassSynthChannel = new Tone.Channel({
//   pan: 0,
//   volume: 10,
//   mute: false,
//   solo: false
// })

// Tone.connect(bassSynthChannel, dest1)
bassSynth.chain(bassSynthFilter, bassSynthReverb, bassSynthChannel)

// let context = new Tone.Context()
// let source = context.createMediaStreamSource(bassSynth)
// let destination = bassSynth.context.createMediaStreamDestination()
// bassSynthChannel.connect(destination)
// source.setSinkId(3)

// var audio = new Audio()
// audio.src = window.URL.createObjectURL(destination.stream)
// audio.srcObject = destination.stream
// audio.play()
// console.log(MediaDevices)
// audio.setSinkId()

// document.querySelector('audio').src = URL.createObjectURL(bassSynthChannel)

// audio.src = URL.createObjectURL(dest1.stream)
// audio.play()

export default class Room3 extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(
      this,
      'changeSynthValue',
      'toggleEffect',
      'changeEffectWetValue',
      'changeEffectValue',
      'changeChannelValue',
      'toggleChannelValue'
    )

    this.state = {
      bassSynth,
      bassSynthFilter: {
        name: 'bassSynthFilter',
        effect: bassSynthFilter,
        wet: bassSynthFilter.wet.value,
        on: true
      },
      bassSynthReverb: {
        name: 'bassSynthReverb',
        effect: bassSynthReverb,
        wet: bassSynthReverb.wet.value,
        on: true
      },
      bassSynthChannel: {
        name: 'bassSynthChannel',
        channel: bassSynthChannel,
        pan: bassSynthChannel.pan.value,
        volume: bassSynthChannel.volume.value,
        mute: false,
        solo: false
      }
    }
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

  render() {
    return (
      <div>
        <div onClick={() => bassSynthPart.start()}>Start</div>
        <div onClick={() => bassSynthPart.stop()}>Stop</div>

        <div className="effectsBoard">
          <PolySynth
            text="Bass Synth"
            synth="bassSynth"
            instrument={this.state.bassSynth}
            on=""
            togglePlay=""
            changeSynthValue={this.changeSynthValue}
          />
          <AutoFilter
            {...this.state.bassSynthFilter}
            toggleEffect={() => this.toggleEffect('bassSynthFilter')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <JcReverb
            {...this.state.bassSynthReverb}
            toggleEffect={() => this.toggleEffect('bassSynthReverb')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Channel
            {...this.state.bassSynthChannel}
            changeChannelValue={this.changeChannelValue}
            toggleChannelValue={this.toggleChannelValue}
          />
        </div>
      </div>
    )
  }
}
