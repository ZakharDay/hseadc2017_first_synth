import _ from 'lodash'
import 'whatwg-fetch'
import React from 'react'
import Tone from 'tone'

import * as drums from '../tunes/drums'
import * as effects from '../tunes/effects'
import * as parts from '../tunes/parts'
import * as synths from '../tunes/synths'

import Speed from '../components/utilities/Speed'

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

export default class Synth extends React.Component {
  constructor(props) {
    super(props)

    const defaultWetValue = 0.8

    let kickDrum = drums.kickDrum()
    let kickAutoFilter = effects.autoFilter()
    let kickFreeverb = effects.freeverb()
    let kickChebyshev = effects.chebyshev()

    // let snareDrum = drums.snareDrum()
    let snareHit = new Tone.NoiseSynth({
      noise: {
        type: 'pink'
      },
      envelope: {
        attack: 0.001,
        decay: 0.1,
        sustain: 0.5,
        release: 1.75
      }
    })

    let snareDrum = new Tone.MetalSynth({
      harmonicity: 300, // 200 sounds like a timbali
      resonance: 200, // 200 is nice
      modulationIndex: 250,
      envelope: {
        decay: 0.25, // 0.2 gives some percusive snare sounds
        sustain: 0.0125,
        release: 0.05
      },
      volume: -5
    })

    let snareMembrane = new Tone.MembraneSynth()

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

    let ambientSynth = synths.toneSynth()
    let ambientAutoFilter = effects.autoFilter()
    let ambientChorus = effects.chorus()
    let ambientDistortion = effects.distortion()
    let ambientFeedbackDelay = effects.feedbackDelay()
    let ambientFreeverb = effects.freeverb()
    let ambientPhaser = effects.phaser()
    let ambientPingPongDelay = effects.pingPongDelay()

    let leadSynth = synths.polySynth()
    let leadAutoPanner = effects.autoPanner()
    let leadAutoWah = effects.autoWah()
    let leadBitCrusher = effects.bitCrusher()
    let leadChebyshev = effects.chebyshev()
    let leadDistortion = effects.distortion()
    let leadFeedbackEffect = effects.feedbackEffect()
    let leadJcReverb = effects.jcReverb()
    let leadPitchShift = effects.pitchShift()
    let leadReverb = effects.reverb()
    let leadStereoWidener = effects.stereoWidener()
    let leadTremolo = effects.tremolo()
    let leadVibrato = effects.vibrato()

    let loop1 = new Tone.Loop(function(time) {
      ambientSynth.triggerAttackRelease('C2', '8n', time)
    }, '4n')

    let loop3 = new Tone.Loop(function(time) {
      leadSynth.triggerAttackRelease('C4', '1m', time)
    }, '1m')

    let loop4 = new Tone.Loop(function(time) {
      ambientSynth.triggerAttackRelease('C4', '1m', time)
    }, '1m')

    let loop5 = new Tone.Loop(function(time) {
      kickDrum.triggerAttackRelease('G0', '16n', time)
    }, '4n')

    let drumLoop1Kick = new Tone.Sequence(
      function(time, note) {
        kickDrum.triggerAttackRelease(note, '16n', time)
      },
      [
        'G0',
        'G0',
        null,
        null,
        null,
        null,
        null,
        null,
        'G0',
        null,
        null,
        null,
        null,
        'G0',
        null,
        null,
        'G0',
        'G0',
        null,
        null,
        null,
        null,
        null,
        null,
        'G0',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        'G0',
        'G0',
        null,
        null,
        null,
        null,
        null,
        null,
        'G0',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        'G0',
        'G0',
        null,
        null,
        null,
        null,
        null,
        null,
        'G0',
        null,
        null,
        null,
        null,
        null,
        null,
        'G0'
        // 'G0',
        // null,
        // null,
        // 'G0',
        // null,
        // null,
        // null,
        // 'G0',
        // null,
        // null,
        // null,
        // null,
        // null,
        // 'G0',
        // null,
        // null
      ],
      '16n'
    )

    var drumLoop1Snare = new Tone.Sequence(
      function(time, note) {
        // // snareDrum.frequency.setValueAtTime(note, time)
        // snareDrum.triggerAttack(time, Math.random() * 0.5 + 0.5)
        // // hitsnare.triggerAttackRelease('16n', time, 1)
        // snareMembrane.triggerAttackRelease('E1', '16n', time, 1)
        snareDrum.frequency.setValueAtTime(note, time)
        snareDrum.triggerAttack(time, Math.random() * 0.5 + 0.5)
        snareHit.triggerAttackRelease('16n', time, 1)
        snareMembrane.triggerAttackRelease('E1', '16n', time, 1)
      },
      [
        null,
        null,
        null,
        null,
        51,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        51,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        51,
        null,
        null,
        51,
        null,
        null,
        null,
        null,
        51,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        51,
        51,
        null,
        null,
        null,
        null,
        null,
        null,
        51,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        51,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        51,
        null,
        null,
        null
        // null,
        // null,
        // null,
        // null,
        // null,
        // null,
        // 51,
        // null,
        // null,
        // null,
        // null,
        // null,
        // 51,
        // null,
        // null,
        // null
      ],
      '16n'
    )

    kickDrum.chain(kickAutoFilter, kickFreeverb, kickChebyshev, Tone.Master)

    snareDrum.chain(
      snarePitchShift,
      snareEQ,
      // snareFreeverb,
      // smtng
      Tone.Master
    )

    snareDrum.chain(
      snarePitchShift,
      snareAutoFilter,
      snareEQ,
      // snareFreeverb,
      //
      Tone.Master
    )

    snareMembrane.chain(snareEQ)
    snareHit.chain(snareEQ)
    snareDrum.connect(snareFreeverb)

    ambientSynth.chain(
      ambientAutoFilter,
      ambientChorus,
      ambientDistortion,
      ambientFeedbackDelay,
      ambientFreeverb,
      ambientPhaser,
      ambientPingPongDelay,
      Tone.Master
    )
    // ambientPingPongDelay.toMaster()

    leadSynth.chain(
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
      Tone.Master
    )

    this.state = {
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
      ambientSynth,
      ambientAutoFilter: {
        name: 'ambientAutoFilter',
        effect: ambientAutoFilter,
        wet: defaultWetValue,
        on: false
      },
      ambientChorus: {
        name: 'ambientChorus',
        effect: ambientChorus,
        wet: defaultWetValue,
        on: false
      },
      ambientDistortion: {
        name: 'ambientDistortion',
        effect: ambientDistortion,
        wet: defaultWetValue,
        on: false
      },
      ambientFeedbackDelay: {
        name: 'ambientFeedbackDelay',
        effect: ambientFeedbackDelay,
        wet: defaultWetValue,
        on: false
      },
      ambientFreeverb: {
        name: 'ambientFreeverb',
        effect: ambientFreeverb,
        wet: defaultWetValue,
        on: false
      },
      ambientPhaser: {
        name: 'ambientPhaser',
        effect: ambientPhaser,
        wet: defaultWetValue,
        on: false
      },
      ambientPingPongDelay: {
        name: 'ambientPingPongDelay',
        effect: ambientPingPongDelay,
        wet: defaultWetValue,
        on: false
      },
      leadSynth,
      leadAutoPanner: {
        name: 'leadAutoPanner',
        effect: leadAutoPanner,
        wet: defaultWetValue,
        on: false
      },
      leadAutoWah: {
        name: 'leadAutoWah',
        effect: leadAutoWah,
        wet: defaultWetValue,
        on: false
      },
      leadBitCrusher: {
        name: 'leadBitCrusher',
        effect: leadBitCrusher,
        wet: defaultWetValue,
        on: false
      },
      leadChebyshev: {
        name: 'leadChebyshev',
        effect: leadChebyshev,
        wet: defaultWetValue,
        on: false
      },
      leadDistortion: {
        name: 'leadDistortion',
        effect: leadDistortion,
        wet: defaultWetValue,
        on: false
      },
      leadFeedbackEffect: {
        name: 'leadFeedbackEffect',
        effect: leadFeedbackEffect,
        wet: defaultWetValue,
        on: false
      },
      leadJcReverb: {
        name: 'leadJcReverb',
        effect: leadJcReverb,
        wet: defaultWetValue,
        on: false
      },
      leadPitchShift: {
        name: 'leadPitchShift',
        effect: leadPitchShift,
        wet: defaultWetValue,
        on: false
      },
      leadReverb: {
        name: 'leadReverb',
        effect: leadReverb,
        wet: defaultWetValue,
        on: false
      },
      leadStereoWidener: {
        name: 'leadStereoWidener',
        effect: leadStereoWidener,
        wet: defaultWetValue,
        on: false
      },
      leadTremolo: {
        name: 'leadTremolo',
        effect: leadTremolo,
        wet: defaultWetValue,
        on: false
      },
      leadVibrato: {
        name: 'leadVibrato',
        effect: leadVibrato,
        wet: defaultWetValue,
        on: false
      },
      loop1: {
        loop: loop1,
        on: false
      },
      loop3: {
        loop: loop3,
        on: false
      },
      loop4: {
        loop: loop4,
        on: false
      },
      loop5: {
        loop: loop5,
        on: false
      },
      part1: {
        part: parts.part1(leadSynth),
        on: false
      },
      drumLoop1Kick: {
        loop: drumLoop1Kick,
        on: false
      },
      drumLoop1Snare: {
        loop: drumLoop1Snare,
        on: false
      },
      lastChange: Date.now(),
      timeout: 100,
      bpm: 90
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
      'changeSynthValue',
      'toggleEffect',
      'changeEffectWetValue',
      'changeEffectValue',
      'loadPreset',
      'savePreset',
      'setPreset'
    )
  }

  componentDidMount() {
    // this.generateRandom()

    let { name, effect, wet, on } = this.state.ambientDistortion

    console.log(this.props)

    effect.wet.value = on == true ? this.props.ambientDistortion.wet : 0
    effect.distortion = this.props.ambientDistortion.effect.distortion
    effect.oversample = this.props.ambientDistortion.effect.oversample

    this.setState({
      ambientDistortion: {
        name,
        effect,
        wet: this.props.ambientDistortion.wet,
        on
      }
    })

    Tone.Transport.bpm.value = this.state.bpm
    Tone.Transport.start()
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

    if (drumLoopSnare.on == true && drumLoopKick.on == true) {
      drumLoopSnare.loop.stop()
      drumLoopKick.loop.stop()
    } else {
      drumLoopSnare.loop.start('0m')
      drumLoopKick.loop.start('0m')
    }

    this.setState({
      [`${drumLoop + 'Snare'}`]: {
        loop: drumLoopSnare.loop,
        on: !drumLoopSnare.on
      },
      [`${drumLoop + 'Kick'}`]: {
        loop: drumLoopKick.loop,
        on: !drumLoopKick.on
      }
    })
  }

  toggleLoop(loopName) {
    let { loop, on } = this.state[loopName]

    on == true ? loop.stop() : loop.start('0m')

    this.setState({
      [`${loopName}`]: {
        loop: loop,
        on: !on
      }
    })
  }

  togglePart(partName) {
    let { part, on } = this.state[partName]

    on == true ? part.stop(0) : part.start(0)

    this.setState({
      [`${partName}`]: {
        part: part,
        on: !on
      }
    })
  }

  changeBpmValue(synthName, effectName, value) {
    Tone.Transport.bpm.value = Math.round(value)

    this.setState({
      bpm: Math.round(value)
    })
  }

  changeSynthValue(synthName, effectName, value) {
    let synth = this.state[synthName]
    // let { envelope, oscillator } = synth.instrument
    let { envelope } = synth
    synth.envelope[effectName] = value

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
      ambientSynth,
      ambientAutoFilter,
      ambientChorus,
      ambientDistortion,
      ambientFeedbackDelay,
      ambientFreeverb,
      ambientPhaser,
      ambientPingPongDelay,
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
      loop1,
      loop4,
      loop5,
      part1,
      drumLoop1Kick,
      drumLoop1Snare,
      bpm
    } = this.state

    let {
      toggleEffect,
      toggleLoop,
      toggleDrum,
      togglePart,
      changeBpmValue,
      changeSynthValue,
      changeEffectWetValue,
      changeEffectValue,
      changeEffectFilterValue,
      loadPreset,
      savePreset
    } = this

    return (
      <div>
        <div onClick={this.copyAll}>COPY ALL</div>

        <div className="effectsBoard">
          <Speed bpm={bpm} changeBpmValue={changeBpmValue} />
        </div>

        <div className="effectsBoard">
          <MembraneSynth
            synth="kickDrum"
            instrument={kickDrum}
            on={drumLoop1Kick.on}
            togglePlay={() => toggleDrum('drumLoop1')}
            changeSynthValue={this.changeSynthValue}
          />
          <AutoFilter
            {...kickAutoFilter}
            toggleEffect={() => toggleEffect('kickAutoFilter')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <Freeverb
            {...kickFreeverb}
            toggleEffect={() => toggleEffect('kickFreeverb')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <Chebyshev
            {...kickChebyshev}
            toggleEffect={() => toggleEffect('kickChebyshev')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
        </div>
        <div className="effectsBoard">
          <NoiseSynth
            synth="snareDrum"
            instrument={snareDrum}
            on={drumLoop1Snare.on}
            togglePlay={() => toggleDrum('drumLoop1')}
            changeSynthValue={this.changeSynthValue}
          />
          <AutoFilter
            {...snareAutoFilter}
            toggleEffect={() => toggleEffect('snareAutoFilter')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <PitchShift
            {...snarePitchShift}
            toggleEffect={() => toggleEffect('snarePitchShift')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <Freeverb
            {...snareFreeverb}
            toggleEffect={() => toggleEffect('snareFreeverb')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
        </div>
        <div className="effectsBoard">
          <div className="PresetButton" onClick={() => loadPreset(1)}>
            Load 1
          </div>
          <div className="PresetButton" onClick={() => savePreset(1)}>
            Save 1
          </div>
          <div className="PresetButton" onClick={() => loadPreset(2)}>
            Load 2
          </div>
          <div className="PresetButton" onClick={() => savePreset(2)}>
            Save 2
          </div>

          <ToneSynth
            synth="ambientSynth"
            instrument={ambientSynth}
            on={loop1.on}
            togglePlay={() => toggleLoop('loop1')}
            changeSynthValue={this.changeSynthValue}
          />
          <AutoFilter
            {...ambientAutoFilter}
            toggleEffect={() => toggleEffect('ambientAutoFilter')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <Chorus
            {...ambientChorus}
            toggleEffect={() => toggleEffect('ambientChorus')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <Distortion
            {...ambientDistortion}
            toggleEffect={() => toggleEffect('ambientDistortion')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <FeedbackDelay
            {...ambientFeedbackDelay}
            toggleEffect={() => toggleEffect('ambientFeedbackDelay')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <Freeverb
            {...ambientFreeverb}
            toggleEffect={() => toggleEffect('ambientFreeverb')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <Phaser
            {...ambientPhaser}
            toggleEffect={() => toggleEffect('ambientPhaser')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <PingPongDelay
            {...ambientPingPongDelay}
            toggleEffect={() => toggleEffect('ambientPingPongDelay')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
        </div>

        <div className="effectsBoard">
          <PolySynth
            synth="leadSynth"
            instrument={ambientSynth}
            on={part1.on}
            togglePlay={() => togglePart('part1')}
            changeSynthValue={changeSynthValue}
          />
          <AutoPanner
            {...leadAutoPanner}
            toggleEffect={() => toggleEffect('leadAutoPanner')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <AutoWah
            {...leadAutoWah}
            toggleEffect={() => toggleEffect('leadAutoWah')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <BitCrusher
            {...leadBitCrusher}
            toggleEffect={() => toggleEffect('leadBitCrusher')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <Chebyshev
            {...leadChebyshev}
            toggleEffect={() => toggleEffect('leadChebyshev')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <Distortion
            {...leadDistortion}
            toggleEffect={() => toggleEffect('leadDistortion')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <FeedbackEffect
            {...leadFeedbackEffect}
            toggleEffect={() => toggleEffect('leadFeedbackEffect')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <JcReverb
            {...leadJcReverb}
            toggleEffect={() => toggleEffect('leadJcReverb')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <PitchShift
            {...leadPitchShift}
            toggleEffect={() => toggleEffect('leadPitchShift')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <Reverb
            {...leadReverb}
            toggleEffect={() => toggleEffect('leadReverb')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <StereoWidener
            {...leadStereoWidener}
            toggleEffect={() => toggleEffect('leadStereoWidener')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <Tremolo
            {...leadTremolo}
            toggleEffect={() => toggleEffect('leadTremolo')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
          <Vibrato
            {...leadVibrato}
            toggleEffect={() => toggleEffect('leadVibrato')}
            changeEffectWetValue={changeEffectWetValue}
            changeEffectValue={changeEffectValue}
          />
        </div>
      </div>
    )
  }
}
