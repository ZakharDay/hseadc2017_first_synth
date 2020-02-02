import _, { merge } from 'lodash'
import React from 'react'
import Tone from 'tone'
let unmuteAudio = require('unmute-ios-audio')

import * as utilities from '../tunes/utilities'

import * as soloSynthTunes from '../tunes/r1-solo-synth'

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
import Sensor from '../components/utilities/Sensor'

let bpm = 30
const defaultWetValue = 1

let soloSynthChannel = utilities.channel(-33)

let soloSynth = soloSynthTunes.toneSynth()
let soloSynthTremolo = soloSynthTunes.tremolo()
let soloSynthVibrato = soloSynthTunes.vibrato()
let soloSynthChorus = soloSynthTunes.chorus()
let soloSynthReverb = soloSynthTunes.jcReverb()
let soloSynthDelay = soloSynthTunes.pingPongDelay()
let soloSynthFilter = soloSynthTunes.autoFilter()
let soloSynthPart1 = soloSynthTunes.part1(soloSynth)
let soloSynthPart2 = soloSynthTunes.part2(soloSynth)
let soloSynthPart3 = soloSynthTunes.part3(soloSynth)

soloSynth.chain(
  soloSynthTremolo,
  soloSynthVibrato,
  soloSynthChorus,
  soloSynthReverb,
  soloSynthDelay,
  soloSynthFilter,
  soloSynthChannel
)

export default class Room1 extends React.Component {
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
      'changeSensorValue'
    )

    this.state = {
      sensor1: {
        previousValue: 0,
        currentValue: 0,
        name: 'sensor1'
      },
      sensor2: {
        previousValue: 0,
        currentValue: 0,
        name: 'sensor2'
      },
      soloSynth,
      soloSynthTremolo: {
        name: 'soloSynthTremolo',
        effect: soloSynthTremolo,
        wet: soloSynthTremolo.wet.value,
        on: true
      },
      soloSynthVibrato: {
        name: 'soloSynthVibrato',
        effect: soloSynthVibrato,
        wet: soloSynthVibrato.wet.value,
        on: true
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
      soloSynthDelay: {
        name: 'soloSynthDelay',
        effect: soloSynthDelay,
        wet: soloSynthDelay.wet.value,
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

  handleStart() {
    unmuteAudio()
    Tone.Transport.bpm.value = bpm
    Tone.Transport.scheduleRepeat(this.nextMeasure, '1m')
    Tone.Transport.start()
  }

  startSoloPart1() {
    soloSynthPart1.start()
    soloSynthPart2.stop()
    soloSynthPart3.stop()
  }

  startSoloPart2() {
    soloSynthPart1.stop()
    soloSynthPart2.start()
    soloSynthPart3.stop()
  }

  startSoloPart3() {
    soloSynthPart1.stop()
    soloSynthPart2.stop()
    soloSynthPart3.start()
  }

  stopSoloParts() {
    soloSynthPart1.stop()
    soloSynthPart2.stop()
    soloSynthPart3.stop()
  }

  changeSensorValue(sensorName, value) {
    console.log('changeSensorValue', sensorName, value)
    let previousValue = this.state[sensorName].currentValue

    this.setState({
      [sensorName]: {
        previousValue: previousValue,
        currentValue: value,
        name: sensorName
      }
    })

    switch (sensorName) {
      case 'sensor1':
        let calculatedValue = value / 1200
        this.changeEffectValue(
          'soloSynthReverb',
          'roomSize.value',
          calculatedValue
        )
        break
    }
  }

  render() {
    return (
      <div>
        <div onClick={() => this.handleStart()}>Start Transport</div>
        <div onClick={() => this.startSoloPart1()}>Part 1</div>
        <div onClick={() => this.startSoloPart2()}>Part 2</div>
        <div onClick={() => this.startSoloPart3()}>Part 3</div>
        <div onClick={() => this.stopSoloParts()}>Stop</div>

        <div className="effectsBoard">
          <Sensor
            {...this.state.sensor1}
            changeSensorValue={this.changeSensorValue}
          />
          <Sensor
            {...this.state.sensor2}
            changeSensorValue={this.changeSensorValue}
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
          <Tremolo
            {...this.state.soloSynthTremolo}
            toggleEffect={() => this.toggleEffect('soloSynthTremolo')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Vibrato
            {...this.state.soloSynthVibrato}
            toggleEffect={() => this.toggleEffect('soloSynthVibrato')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
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
          <PingPongDelay
            {...this.state.soloSynthDelay}
            toggleEffect={() => this.toggleEffect('soloSynthDelay')}
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
