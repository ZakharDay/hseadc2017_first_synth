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
      })
    }
  }

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
          />
        </div>
      </div>
    )
  }
}
