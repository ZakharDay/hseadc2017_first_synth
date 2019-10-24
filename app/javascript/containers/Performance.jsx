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

import Gain from '../components/utilities/Gain'

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

// intro
let lightSynth = lightSynthTunes.polySynth()
let lightSynthFilter = lightSynthTunes.autoFilter()
let lightSynthReverb = lightSynthTunes.jcReverb()
let lightSynthChorus = lightSynthTunes.chorus().toMaster()
let lightSynthPart = lightSynthTunes.introPart(lightSynth)
let lightSynthGain = new Tone.Gain()
lightSynth.chain(
  lightSynthFilter,
  lightSynthReverb,
  lightSynthChorus,
  lightSynthGain
)

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
      'changeDrumLoop',
      'changeSynthValue',
      'toggleEffect',
      'changeEffectWetValue',
      'changeEffectValue',
      'changeGainValue'
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
      lightSynthGain
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

  changeSynthValue(synthName, effectName, value) {
    let regexBefore = /(.*)\./
    let regexAfter = /\.(.*)/
    let synth = this.state[synthName]
    let effectNameNamespace = effectName.match(regexBefore)[1]
    let effectNameInNamespace = effectName.match(regexAfter)[1]
    // let { envelope, oscillator } = synth.instrument
    // let { envelope } = synth
    // console.log('test', effectName, effectName.match(regexAfter))

    if (synthName == 'bassSynth' || synthName == 'leadSynth') {
      if (effectNameNamespace == 'oscillator') {
        synth.voices[0].oscillator[effectNameInNamespace] = value
      } else if (effectNameNamespace == 'envelope') {
        synth.voices[0].envelope[effectNameInNamespace] = value
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

  changeGainValue(synthName, effectName, value) {
    let synth = this.state[synthName]
    synth.gain.value = value
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

        <div className="effectsBoard">
          <PolySynth
            synth="lightSynth"
            instrument={this.state.lightSynth}
            on=""
            togglePlay=""
            changeSynthValue={this.changeSynthValue}
          />
          <AutoFilter
            {...this.state.lightSynthFilter}
            toggleEffect={() => toggleEffect('lightSynthFilter')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <JcReverb
            {...this.state.lightSynthReverb}
            toggleEffect={() => toggleEffect('lightSynthReverb')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Chorus
            {...this.state.lightSynthChorus}
            toggleEffect={() => toggleEffect('lightSynthChorus')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
        </div>

        <div className="effectsBoard">
          <ToneSynth
            synth="bassSynth"
            instrument={this.state.bassSynth}
            on=""
            togglePlay=""
            changeSynthValue={this.changeSynthValue}
          />
          <Distortion
            {...this.state.bassSynthDistortion}
            toggleEffect={() => toggleEffect('bassSynthDistortion')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <AutoFilter
            {...this.state.bassSynthFilter}
            toggleEffect={() => toggleEffect('bassSynthFilter')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
        </div>

        <div className="effectsBoard">
          <ToneSynth
            synth="soloSynth"
            instrument={this.state.soloSynth}
            on=""
            togglePlay=""
            changeSynthValue={this.changeSynthValue}
          />
          <Chorus
            {...this.state.soloSynthChorus}
            toggleEffect={() => toggleEffect('soloSynthChorus')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <JcReverb
            {...this.state.soloSynthReverb}
            toggleEffect={() => toggleEffect('soloSynthReverb')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <AutoFilter
            {...this.state.soloSynthFilter}
            toggleEffect={() => toggleEffect('soloSynthFilter')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
        </div>

        <div className="effectsBoard">
          <ToneSynth
            synth="highSynth"
            instrument={this.state.highSynth}
            on=""
            togglePlay=""
            changeSynthValue={this.changeSynthValue}
          />
          <Tremolo
            {...this.state.highSynthTremolo}
            toggleEffect={() => toggleEffect('highSynthTremolo')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Vibrato
            {...this.state.highSynthVibrato}
            toggleEffect={() => toggleEffect('highSynthVibrato')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Distortion
            {...this.state.highSynthDistortion}
            toggleEffect={() => toggleEffect('highSynthDistortion')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
        </div>
      </div>
    )
  }
}
