import _, { merge } from 'lodash'
import $ from 'jquery'
import React from 'react'
import Tone from 'tone'
let unmuteAudio = require('unmute-ios-audio')

import * as utilities from '../tunes/utilities'

import * as synthTunes from '../tunes/r3-synth'
import * as noiseTunes from '../tunes/r3-noiseSynth'
import * as samplerTunes from '../tunes/r3-sampler'
import * as synth2Tunes from '../tunes/r3-synth2'
import * as bassSynthTunes from '../tunes/r3-bass-synth'

import AutoFilter from '../components/effects/AutoFilter'
import Distortion from '../components/effects/Distortion'
import BitCrusher from '../components/effects/BitCrusher'
import Vibrato from '../components/effects/Vibrato'
import JcReverb from '../components/effects/JcReverb'

import PolySynth from '../components/synths/PolySynth'
import ToneSynth from '../components/synths/ToneSynth'
import MetalSynth from '../components/synths/MetalSynth'
import Channel from '../components/utilities/Channel'
import Sensor from '../components/utilities/Sensor'

let bpm = 30
const defaultWetValue = 1

let noiseChannel = utilities.channel(-80)
let bassSynthChannel = utilities.channel(-27)

let noise = noiseTunes.synth()
noise.chain(noiseChannel)

let bassSynth = bassSynthTunes.bass()
let bassSynthFilter = bassSynthTunes.autoFilter()
let bassSynthReverb = bassSynthTunes.jcReverb()
let bassSynthPart = bassSynthTunes.part(bassSynth)
bassSynth.chain(bassSynthFilter, bassSynthReverb, bassSynthChannel)

export default class Room3 extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(
      this,
      'getSensorData',
      'handleStart',
      'handleStop',
      'changeSynthValue',
      'toggleEffect',
      'changeEffectWetValue',
      'changeEffectValue',
      'changeChannelValue',
      'toggleChannelValue',
      'handleKeydown',
      'handleKeyup',
      'toggleNote',
      'stopNote',
      'changeSensorValue',
      'useSensorData',
      'triggerPauseSituation'
    )

    this.state = {
      previousSensor: 0,
      sensor: 0,
      noise,
      noiseChannel: {
        name: 'noiseChannel',
        channel: noiseChannel,
        pan: noiseChannel.pan.value,
        volume: noiseChannel.volume.value,
        mute: false,
        solo: false
      },
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

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown)
    document.addEventListener('keyup', this.handleKeyup)
    this.getSensorData()
  }

  getSensorData() {
    let self = this

    $.ajax({
      url: "http://localhost:3000/serial_port/read",
      dataType: "json"
    }).done(function(data) {
      if (data.measurment < 2500 && data.measurment != 0) {
        self.setState(
          {sensor: data.measurment}
        )

        self.changeSensorValue()
      }
      console.log("success", data.measurment, self.state.sensor)
    }).fail(function() {
      // console.log("error")
    }).always(function() {
      // console.log("complete")
    })

    setTimeout(function () { self.getSensorData() }, 50)
  }

  handleStart() {
    unmuteAudio()
    Tone.Transport.bpm.value = bpm
    Tone.Transport.scheduleRepeat(this.nextMeasure, '1m')
    Tone.Transport.start()

    noise.start()
    bassSynthPart.start()
  }

  handleStop() {
    noise.start()
    bassSynthPart.start()
    Tone.Transport.stop()
  }

  handleKeydown(e) {
    console.log(e.key, e.code, e.keyCode)

    switch (e.keyCode) {
      case 70:
        console.log('f')
        noise.triggerAttackRelease('1m')
        break
    }
  }

  handleKeyup() {
    this.stopNote()
  }

  toggleNote(note, synth) {
    console.log(note, synth)
    synth.triggerAttack(note, '16n')
  }

  stopNote() {
    noise.triggerRelease()
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
      // } else if (synthName == 'bassSynth') {
      //   if (effectNameNamespace == 'oscillator') {
      //     synth.oscillator[effectNameInNamespace] = value
      //   } else if (effectNameNamespace == 'envelope') {
      //     synth.envelope[effectNameInNamespace] = value
      //   }
    } else {
      synth[effectName] = value
    }

    this.setState({
      [`${synthName}`]: synth
    })
  }

  changeChannelValue(channelName, valueName, value) {
    // console.log(channelName, valueName, value)
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

  changeSensorValue(name, property, value) {
    let previousSensor = this.state.sensor

    this.setState({
      previousSensor: previousSensor,
      sensor: value
    })

    // this.useSensorData(value)

    if (this.state.sensor >= 1000 && this.state.previousSensor <= 1000) {
      this.triggerPauseSituation()
    } else if (this.state.sensor <= 1000 && this.state.previousSensor >= 1000) {
      this.triggerPlaySituation()
    }
  }

  triggerPauseSituation() {
    console.log('triggerPauseSituation')
    // let noiseChannelVolume = this.state.noiseChannel.volume

    // this.changeChannelValue('noiseChannel', 'volume', -80)
    // noiseChannel.volume.value = -80

    while (this.state.noiseChannel.volume <= -27) {
      let nextValue = this.state.noiseChannel.volume + 0.1
      this.changeChannelValue('noiseChannel', 'volume', nextValue)
    }

    while (this.state.bassSynthChannel.volume >= -80) {
      let nextValue = this.state.bassSynthChannel.volume - 0.1
      this.changeChannelValue('bassSynthChannel', 'volume', nextValue)
    }
  }

  triggerPlaySituation() {
    console.log('triggerPlaySituation')

    while (this.state.noiseChannel.volume >= -80) {
      let nextValue = this.state.noiseChannel.volume - 0.1
      this.changeChannelValue('noiseChannel', 'volume', nextValue)
    }

    while (this.state.bassSynthChannel.volume <= -27) {
      let nextValue = this.state.bassSynthChannel.volume + 0.1
      this.changeChannelValue('bassSynthChannel', 'volume', nextValue)
    }
  }

  // Trigger for sensor data
  useSensorData(value) {
    let effect = this.state.synthDistortion
    // value = props.data
    this.changeEffectWetValue(effect.name, 'wet', value)
  }

  render() {
    return (
      <div>
        <button onClick={this.handleStart}>Start</button>
        <Sensor
          sensor={this.state.sensor}
          changeSensorValue={this.changeSensorValue}
        />

        <div className="effectsBoard">
          <p>Noise</p>
          <div
            className="StartButton"
            onClick={() => this.handleStart('noise')}
            onTouchStart={() => this.handleStart('noise')}
          >
            Start Noise
          </div>
          <div
            className="StartButton"
            onClick={() => this.handleStop('noise')}
            onTouchStart={() => this.handleStop('noise')}
          >
            Stop Noise
          </div>
          <Channel
            {...this.state.noiseChannel}
            changeChannelValue={this.changeChannelValue}
            toggleChannelValue={this.toggleChannelValue}
          />
        </div>

        <div className="effectsBoard">
          <div
            className="StartButton"
            onClick={() => this.handleStart('bassSynth')}
            onTouchStart={() => this.handleStart('bassSynth')}
          >
            Start BassSynth
          </div>
          <div
            className="StartButton"
            onClick={() => this.handleStop('bassSynth')}
            onTouchStart={() => this.handleStop('bassSynth')}
          >
            Stop BassSynth
          </div>
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
