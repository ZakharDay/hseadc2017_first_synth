import _, { merge } from 'lodash'
import React from 'react'
import Tone from 'tone'
let unmuteAudio = require('unmute-ios-audio')

import * as utilities from '../tunes/utilities'

import * as bassSynthTunes from '../tunes/r2-bass-synth'
import * as soloSynthTunes from '../tunes/r2-solo-synth'

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

let bpm = 30
const defaultWetValue = 1

let bassSynthChannel = utilities.channel(0)
let soloSynthChannel = utilities.channel(0)

let bassSynth = bassSynthTunes.bass()
let bassSynthFilter = bassSynthTunes.autoFilter()
let bassSynthReverb = bassSynthTunes.jcReverb()
let bassSynthPart = bassSynthTunes.part(bassSynth)
bassSynth.chain(bassSynthFilter, bassSynthReverb, bassSynthChannel)

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

export default class Room2 extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(
      this,
      'handleStart',
      'changeSynthValue',
      'toggleEffect',
      'changeEffectWetValue',
      'changeEffectValue',
      'changeChannelValue',
      'toggleChannelValue'
      // 'toggleNote'
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
      },
      soloSynth,
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
      }
    }
  }

  componentDidMount() {}

  handleStart() {
    unmuteAudio()
    Tone.Transport.bpm.value = bpm
    Tone.Transport.scheduleRepeat(this.nextMeasure, '1m')
    Tone.Transport.start()

    bassSynthPart.start()
    soloSynthPart.start()
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

    if (synthName == 'bassSynth') {
      if (effectNameNamespace == 'oscillator') {
        synth.voices[0].oscillator[effectNameInNamespace] = value
        synth.voices[1].oscillator[effectNameInNamespace] = value
        synth.voices[2].oscillator[effectNameInNamespace] = value
      } else if (effectNameNamespace == 'envelope') {
        console.log('YOYOYOY')
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
        <div
          className="StartButton"
          onClick={() => this.handleStart()}
          onTouchStart={() => this.handleStart()}
        >
          Start
        </div>

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
      </div>
    )
  }
}
