import _, { merge } from 'lodash'
import React from 'react'
import Tone from 'tone'
let unmuteAudio = require('unmute-ios-audio')

import * as utilities from '../tunes/utilities'

import * as synthTunes from '../tunes/r3-synth'
import * as noiseTunes from '../tunes/r3-noiseSynth'

import AutoFilter from '../components/effects/AutoFilter'
import Distortion from '../components/effects/Distortion'
import BitCrusher from '../components/effects/BitCrusher'
import Vibrato from '../components/effects/Vibrato'
import JcReverb from '../components/effects/JcReverb'

import PolySynth from '../components/synths/PolySynth'
import ToneSynth from '../components/synths/ToneSynth'
import MetalSynth from '../components/synths/MetalSynth'
import Channel from '../components/utilities/Channel'

let bpm = 90
const defaultWetValue = 1

let synthChannel = utilities.channel(0)
let noiseChannel = utilities.channel(0)

let synth = synthTunes.synth()
let synthDistortion = synthTunes.distortion()
let synthFilter = synthTunes.autoFilter()
let synthBitCrusher = synthTunes.bitCrusher()
let synthVibrato = synthTunes.vibrato()
let synthReverb = synthTunes.reverb()
let synthPart = synthTunes.part(synth)
synth.chain(
  synthFilter,
  synthDistortion,
  synthBitCrusher,
  synthVibrato,
  synthReverb,
  synthChannel
)

let noise = noiseTunes.synth()
// let noiseStart = noiseTunes.start()
noise.chain(noiseChannel)

export default class Room3 extends React.Component {
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
      'toggleChannelValue',
      'handleKeydown',
      'handleKeyup',
      'toggleNote',
      'stopNote'
    )

    this.state = {
      synth,
      synthFilter: {
        name: 'synthFilter',
        effect: synthFilter,
        wet: synthFilter.wet.value,
        on: true
      },
      synthVibrato: {
        name: 'synthVibrato',
        effect: synthVibrato,
        wet: synthVibrato.wet.value,
        on: true
      },
      synthDistortion: {
        name: 'synthDistortion',
        effect: synthDistortion,
        wet: synthDistortion.wet.value,
        on: true
      },
      synthBitCrusher: {
        name: 'synthBitCrusher',
        effect: synthBitCrusher,
        wet: synthBitCrusher.wet.value,
        on: true
      },
      synthReverb: {
        name: 'synthReverb',
        effect: synthReverb,
        wet: synthReverb.wet.value,
        on: true
      },
      synthChannel: {
        name: 'synthChannel',
        channel: synthChannel,
        pan: synthChannel.pan.value,
        volume: synthChannel.volume.value,
        mute: false,
        solo: false
      },
      noise,
      noiseChannel: {
        name: 'noiseChannel',
        channel: noiseChannel,
        pan: noiseChannel.pan.value,
        volume: noiseChannel.volume.value,
        mute: false,
        solo: false
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown)
    document.addEventListener('keyup', this.handleKeyup)
  }

  handleStart() {
    unmuteAudio()
    Tone.Transport.bpm.value = bpm
    Tone.Transport.scheduleRepeat(this.nextMeasure, '1m')
    Tone.Transport.start()

    console.log('start')

    synthPart.start()
    // noisePart.start()
    noiseTunes.start(noise)
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

  toggleNote(note) {
    noise.triggerAttack(note, '16n')
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
            text="Synth"
            synth="synth"
            instrument={this.state.synth}
            on=""
            togglePlay=""
            changeSynthValue={this.changeSynthValue}
          />
          <AutoFilter
            {...this.state.synthFilter}
            toggleEffect={() => this.toggleEffect('bassSynthFilter')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Vibrato
            {...this.state.synthVibrato}
            toggleEffect={() => this.toggleEffect('synthVibrato')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Distortion
            {...this.state.synthDistortion}
            toggleEffect={() => this.toggleEffect('synthDistortion')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <BitCrusher
            {...this.state.synthBitCrusher}
            toggleEffect={() => this.toggleEffect('synthBitCrusher')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <JcReverb
            {...this.state.synthReverb}
            toggleEffect={() => this.toggleEffect('synthReverb')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Channel
            {...this.state.synthChannel}
            changeChannelValue={this.changeChannelValue}
            toggleChannelValue={this.toggleChannelValue}
          />
        </div>

        <div className="effectsBoard">
          <ToneSynth
            text="noise"
            synth="noise"
            instrument={this.state.noise}
            on=""
            togglePlay=""
            changeSynthValue={this.changeSynthValue}
          />
          <Channel
            {...this.state.noiseChannel}
            changeChannelValue={this.changeChannelValue}
            toggleChannelValue={this.toggleChannelValue}
          />
        </div>
      </div>
    )
  }
}
